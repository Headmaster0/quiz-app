// ==========================================
// Espace formateur : consultation des résultats
// (nécessite common.js chargé avant)
// ==========================================

const SEUIL_VALIDE = 70; // % à partir duquel un module est considéré validé
let resultatsCourants = [];

const $ = (id) => document.getElementById(id);

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function getCode() {
  try { return sessionStorage.getItem('admin_code') || ''; } catch (e) { return ''; }
}
function setCode(code) {
  try {
    if (code) sessionStorage.setItem('admin_code', code);
    else sessionStorage.removeItem('admin_code');
  } catch (e) {}
}

async function appelAdmin(chemin) {
  const response = await fetch(`${API_URL}${chemin}`, {
    headers: { Authorization: `Bearer ${getCode()}` }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(data.error || `Erreur ${response.status}`);
    err.status = response.status;
    throw err;
  }
  return data;
}

function messageErreur(err) {
  if (err.status === 401) return "Code d'accès incorrect.";
  if (err.status === 503) return "L'espace formateur n'est pas encore activé sur le serveur (variable ADMIN_CODE manquante sur Render).";
  if (err.status === 500) return 'Le serveur ne parvient pas à lire la base de données. Vérifiez les variables DB_… sur Render.';
  if (err instanceof TypeError) return 'Serveur injoignable. Il se réveille peut-être (jusqu’à 1 minute sur Render) : réessayez.';
  return err.message || 'Erreur inattendue.';
}

// ---------- Connexion ----------
async function seConnecter(code) {
  setCode(code);
  await appelAdmin('/api/admin/verifier');
  $('login-section').classList.add('hidden');
  $('dashboard').classList.remove('hidden');
  await chargerResultats();
}

function seDeconnecter() {
  setCode('');
  resultatsCourants = [];
  $('results-body').innerHTML = '';
  $('dashboard').classList.add('hidden');
  $('login-section').classList.remove('hidden');
  $('admin-code').value = '';
  $('admin-code').focus();
}

// ---------- Chargement ----------
async function chargerResultats() {
  const params = new URLSearchParams();
  const nom = $('filter-name').value.trim();
  const module = $('filter-module').value;
  const jours = $('filter-period').value;
  if (nom) params.set('q', nom);
  if (module) params.set('module', module);
  if (jours && jours !== '0') params.set('jours', jours);

  $('dash-message').textContent = 'Chargement…';
  try {
    const data = await appelAdmin(`/api/admin/resultats?${params.toString()}`);
    resultatsCourants = Array.isArray(data.resultats) ? data.resultats : [];
    afficherStats(resultatsCourants);
    afficherTableau(resultatsCourants);
    $('dash-message').textContent = resultatsCourants.length
      ? ''
      : 'Aucun résultat pour ces filtres.';
  } catch (err) {
    if (err.status === 401) { seDeconnecter(); $('login-error').textContent = "Session expirée : entrez à nouveau le code."; return; }
    $('dash-message').textContent = '⚠️ ' + messageErreur(err);
  }
}

function pourcentage(r) {
  return r.total ? Math.round((r.score / r.total) * 100) : 0;
}

function afficherStats(liste) {
  const nb = liste.length;
  const apprenants = new Set(liste.map(r => String(r.nom || '').trim().toLowerCase())).size;
  const moyenne = nb ? Math.round(liste.reduce((s, r) => s + pourcentage(r), 0) / nb) : null;
  const valides = liste.filter(r => pourcentage(r) >= SEUIL_VALIDE).length;
  $('stat-tests').textContent = nb;
  $('stat-learners').textContent = apprenants;
  $('stat-avg').textContent = moyenne === null ? '–' : `${moyenne} %`;
  $('stat-pass').textContent = nb ? `${Math.round((valides / nb) * 100)} %` : '–';
}

function formatDate(iso) {
  if (!iso) return '–';
  const d = new Date(iso);
  if (isNaN(d)) return esc(iso);
  return d.toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function badgeResultat(pct) {
  return pct >= SEUIL_VALIDE
    ? '<span class="status status-ok">✅ Validé</span>'
    : '<span class="status status-warn">⚠️ À renforcer</span>';
}

function afficherTableau(liste) {
  const body = $('results-body');
  body.innerHTML = '';
  liste.forEach((r, i) => {
    const pct = pourcentage(r);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="Date">${formatDate(r.date)}</td>
      <td data-label="Apprenant"><button type="button" class="link-btn" data-filter-name="${esc(r.nom)}" title="Voir tous les tests de cet apprenant">${esc(r.nom)}</button></td>
      <td data-label="Module">${esc(labelCourt(r.module))}</td>
      <td data-label="Score" class="num"><strong>${esc(r.score)}</strong> / ${esc(r.total)} <span class="pct">(${pct} %)</span></td>
      <td data-label="Résultat">${badgeResultat(pct)}</td>
      <td class="row-action"><button type="button" class="btn-secondary detail-btn" data-index="${i}">Voir les réponses</button></td>
    `;
    body.appendChild(tr);
  });
}

// ---------- Détail ----------
function ouvrirDetail(r) {
  const pct = pourcentage(r);
  $('detail-title').textContent = `${r.nom} — ${labelCourt(r.module)}`;
  $('detail-summary').innerHTML = `${formatDate(r.date)} · Score <strong>${esc(r.score)} / ${esc(r.total)}</strong> (${pct} %) · ${badgeResultat(pct)}`;
  const list = $('detail-list');
  list.innerHTML = '';
  if (!r.reponses || !r.reponses.length) {
    list.innerHTML = '<p class="no-history">Le détail des réponses n’a pas été enregistré pour ce test.</p>';
  }
  (r.reponses || []).forEach((a, i) => {
    const etat = a.isSkipped ? 'skipped' : (a.isCorrect ? 'correct' : 'incorrect');
    const icone = a.isSkipped ? '⚪' : (a.isCorrect ? '✅' : '❌');
    const item = document.createElement('div');
    item.className = `result-item ${etat}`;
    item.innerHTML = `
      <p><strong>Q${i + 1} :</strong> ${esc(a.question)}</p>
      <p>${icone} Réponse : <em>${esc(a.isSkipped ? 'Pas de réponse' : a.userAns)}</em></p>
      ${a.isCorrect ? '' : `<p>Bonne réponse : <strong>${esc(a.correctAns)}</strong></p>`}
    `;
    list.appendChild(item);
  });
  const dlg = $('detail-dialog');
  if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
}

// ---------- Export CSV (ouvrable dans Excel) ----------
function celluleCsv(v) {
  let s = String(v ?? '');
  if (/^[=+\-@]/.test(s)) s = "'" + s; // évite l'exécution de formules dans Excel
  return `"${s.replace(/"/g, '""')}"`;
}

function exporterCsv() {
  if (!resultatsCourants.length) return;
  const lignes = [['Date', 'Apprenant', 'Module', 'Score', 'Total', 'Pourcentage', 'Résultat']];
  resultatsCourants.forEach(r => {
    const pct = pourcentage(r);
    const d = new Date(r.date);
    lignes.push([
      isNaN(d) ? r.date : d.toLocaleString('fr-FR'),
      r.nom, labelCourt(r.module), r.score, r.total, `${pct} %`,
      pct >= SEUIL_VALIDE ? 'Validé' : 'À renforcer'
    ]);
  });
  const csv = '﻿' + lignes.map(l => l.map(celluleCsv).join(';')).join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `resultats-apprenants-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------- Initialisation ----------
document.addEventListener('DOMContentLoaded', () => {
  // Liste des modules dans le filtre
  const select = $('filter-module');
  Object.entries(MODULE_LABELS).forEach(([code, label]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = label;
    select.appendChild(opt);
  });

  $('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = $('admin-code').value.trim();
    if (!code) return;
    $('login-error').textContent = '';
    $('login-btn').disabled = true;
    $('login-btn').textContent = 'Connexion…';
    try {
      await seConnecter(code);
    } catch (err) {
      setCode('');
      $('login-error').textContent = messageErreur(err);
    } finally {
      $('login-btn').disabled = false;
      $('login-btn').textContent = 'Se connecter';
    }
  });

  $('logout-btn').addEventListener('click', seDeconnecter);
  $('refresh-btn').addEventListener('click', chargerResultats);
  $('export-btn').addEventListener('click', exporterCsv);
  $('filter-module').addEventListener('change', chargerResultats);
  $('filter-period').addEventListener('change', chargerResultats);

  let attente;
  $('filter-name').addEventListener('input', () => {
    clearTimeout(attente);
    attente = setTimeout(chargerResultats, 350);
  });

  $('results-body').addEventListener('click', (e) => {
    const detail = e.target.closest('.detail-btn');
    if (detail) { ouvrirDetail(resultatsCourants[Number(detail.dataset.index)]); return; }
    const nom = e.target.closest('[data-filter-name]');
    if (nom) { $('filter-name').value = nom.dataset.filterName; $('filter-period').value = '0'; chargerResultats(); }
  });

  $('detail-close').addEventListener('click', () => $('detail-dialog').close());
  $('detail-dialog').addEventListener('click', (e) => {
    if (e.target === $('detail-dialog')) $('detail-dialog').close(); // clic en dehors
  });

  // Session déjà ouverte dans cet onglet ?
  if (getCode()) {
    seConnecter(getCode()).catch(() => seDeconnecter());
  } else {
    $('admin-code').focus();
  }
});
