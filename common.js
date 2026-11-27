// ==========================================
// Code partagé par le quiz (index.html) et l'espace formateur (admin.html)
// ==========================================

// URL du backend Flask. A modifier ici uniquement.
const API_URL = 'https://quiz-app-w965.onrender.com';

// Libellé lisible d'un module (ex. 'CSP' -> 'Carte de Séjour Pluriannuelle')
const MODULE_LABELS = {
  GRAMMAR: 'Grammaire & Vocabulaire', READING: 'Lecture & Analyse', CIVIC_SKILL: 'Vie Citoyenne',
  CSP: 'Carte de Séjour Pluriannuelle', CR: 'Carte de Résident', NAT: 'Naturalisation',
  A1: 'Niveau A1', A2: 'Niveau A2', B1: 'Niveau B1', B2: 'Niveau B2', ALL: 'Test Global TCF'
};
function labelCourt(code) {
  return MODULE_LABELS[code] || code;
}

// ---------- Thème clair / sombre ----------
function appliquerTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const sombre = theme === 'dark';
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  const btn = document.getElementById('theme-toggle');
  // Le bouton propose le thème inverse
  if (icon) icon.textContent = sombre ? '☀️' : '🌙';
  if (label) label.textContent = sombre ? 'Thème clair' : 'Thème sombre';
  if (btn) {
    btn.setAttribute('aria-pressed', String(!sombre));
    btn.setAttribute('aria-label', sombre ? 'Passer au thème clair' : 'Passer au thème sombre');
    btn.title = btn.getAttribute('aria-label');
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', sombre ? '#0f172a' : '#eef2f7');
}

document.addEventListener('DOMContentLoaded', () => {
  appliquerTheme(document.documentElement.getAttribute('data-theme') || 'dark');
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    const nouveau = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('quiz_theme', nouveau); } catch (e) {}
    appliquerTheme(nouveau);
  });
});
