// ==========================================
// 1. URL DE L'API (Alwaysdata)
// ==========================================
const API_URL = 'https://test-positionnement-sidji-formation.alwaysdata.net';
// ==========================================
// 1. BANQUE DE QUESTIONS (10 Q / MODULAIRE)
// ==========================================
const questionBank = {
  // --- STRUCTURE DE LA LANGUE (GRAMMAIRE & VOCABULAIRE) ---
  'GRAMMAR': [
    { text: 'Choisissez la forme correcte : \'Demain, ils ___ leurs documents à la préfecture.\'', options: ['déposeront', 'déposaient', 'ont déposé', 'déposer'], correctIndex: 0 },
    { text: 'Trouvez le synonyme du mot \'Obligatoire\' :', options: ['Imposé', 'Facultatif', 'Interdit', 'Optionnel'], correctIndex: 0 },
    { text: 'Complétez la phrase : \'Bien qu\'elle ___ fatiguée, elle continue ses démarches.\'', options: ['soit', 'est', 'était', 'sera'], correctIndex: 0 },
    { text: 'Quel est le contraire de \'Augmenter\' ?', options: ['Diminuer', 'Multiplier', 'Ajouter', 'Élever'], correctIndex: 0 },
    { text: 'Choisissez le pronom relatif correct : \'Le dossier ___ je vous ai parlé est validé.\'', options: ['dont', 'que', 'qui', 'où'], correctIndex: 0 },
    { text: 'Complétez : \'Si nous avions reçu l\'accord plus tôt, nous ___ ce stage.\'', options: ['aurions commencé', 'commençons', 'commencerons', 'commencions'], correctIndex: 0 },
    { text: 'Trouvez l\'orthographe correcte :', options: ['Administration', 'Administrasion', 'Adminisstracion', 'Adminitration'], correctIndex: 0 },
    { text: 'Complétez : \'Elle s\'est inscrite à la formation ___ améliorer son niveau.\'', options: ['afin d\'', 'parce qu\'', 'comme', 'car'], correctIndex: 0 },
    { text: 'Quel est le pluriel de \'Un journal\' ?', options: ['Des journaux', 'Des journals', 'Des journauxs', 'Des journales'], correctIndex: 0 },
    { text: 'Complétez : \'Il faut que vous ___ présents à 9h00 précises.\'', options: ['soyez', 'êtes', 'seriez', 'étiez'], correctIndex: 0 }
  ],

  // --- COMPRÉHENSION ÉCRITE (LECTURE & ANALYSE) ---
  'READING': [
    { text: 'Texte : \'Horaires du guichet : Lundi au Vendredi de 8h30 à 12h00. Fermé l\'après-midi.\' Que comprendrez-vous ?', options: ['Le guichet est fermé l\'après-midi', 'Le guichet est ouvert le samedi matin', 'Le guichet ouvre toute la journée', 'Le guichet est réservé aux urgences'], correctIndex: 0 },
    { text: 'Texte : \'Pensez à vous munir de deux pièces d\'identité originales.\' Que signifie cette consigne ?', options: ['Apporter 2 documents d\'identité originaux (pas de copies)', 'Envoyer 2 photocopies par courrier', 'Présenter 1 seul document', 'Ne rien apporter de particulier'], correctIndex: 0 },
    { text: 'Texte : \'Toute demande incomplète sera automatiquement rejetée.\' Que faut-il faire ?', options: ['Fournir l\'intégralité des pièces demandées', 'Envoyer seulement la moitié du dossier', 'Payer des frais supplémentaires', 'Attendre une relance téléphonique'], correctIndex: 0 },
    { text: 'Texte : \'Accès interdit sans badge d\'identification.\' Que signifie ce panneau ?', options: ['Seules les personnes ayant un badge peuvent entrer', 'Entrée libre pour tout le monde', 'Entrée réservée aux étudiants', 'Port du masque obligatoire'], correctIndex: 0 },
    { text: 'Texte : \'En cas de changement d\'adresse, signalez-le sous 30 jours.\' Que devez-vous faire ?', options: ['Informer l\'organisme dans un délai maximum d\'un mois', 'Changer immédiatement d\'appartement', 'Ne rien déclarer avant la fin d\'année', 'Rendre sa carte de séjour'], correctIndex: 0 },
    { text: 'Texte : \'Prenez rang au guichet n°4 dès le signal sonore.\' Que devez-vous faire ?', options: ['Attendre le signal sonore avant d\'aller au guichet 4', 'Aller immédiatement au guichet 1', 'Appeler un conseiller au téléphone', 'Reprendre un nouveau ticket'], correctIndex: 0 },
    { text: 'Texte : \'Seules les convocations papier sont acceptées à l\'entrée.\' Que faut-il présenter ?', options: ['Un document imprimé', 'Un SMS sur téléphone', 'Une carte bancaire', 'Une photo d\'identité'], correctIndex: 0 },
    { text: 'Texte : \'Merci de maintenir le calme dans la salle d\'attente.\' Que demande ce message ?', options: ['Ne pas faire de bruit', 'Attendre dehors', 'Ne pas utiliser de stylos', 'Éteindre les lumières'], correctIndex: 0 },
    { text: 'Texte : \'Paiement uniquement par carte bancaire.\' Que pouvez-vous utiliser ?', options: ['Une carte bancaire (pas d\'espèces)', 'Des pièces de monnaie', 'Un chèque cadeau', 'Des billets de banque'], correctIndex: 0 },
    { text: 'Texte : \'Rendez-vous annulé en cas de retard supérieur à 15 minutes.\' Que risque un retardataire ?', options: ['Perdre son rendez-vous', 'Payer une amende', 'Attendre 5 minutes de plus', 'Repasser le lendemain sans convocation'], correctIndex: 0 }
  ],

  // --- CULTURE CIVIQUE & MISES EN SITUATION ---
  'CIVIC_SKILL': [
    { text: 'Quel principe garantit la neutralité de l\'État vis-à-vis de toutes les religions ?', options: ['La laïcité', 'La souveraineté', 'La fraternité', 'La décentralisation'], correctIndex: 0 },
    { text: '[Mise en situation] Vous recevez un courrier de la CAF demandant une pièce justificative. Que devez-vous faire ?', options: ['Répondre dans les délais en envoyant le document réclamé', 'Ignorer la lettre', 'Attendre 6 mois', 'Changer de numéro de téléphone'], correctIndex: 0 },
    { text: 'Quel est le rôle principal du Maire dans une commune ?', options: ['Administrer la commune et gérer l\'état civil', 'Voter les lois nationales', 'Diriger l\'armée', 'Fixer les impôts nationaux'], correctIndex: 0 },
    { text: '[Mise en situation] Vous cherchez un logement et l\'agence refuse votre dossier à cause de votre origine. Que dit la loi ?', options: ['La discrimination est strictement interdite et punie par la loi', 'L\'agence a le droit de choisir selon l\'origine', 'C\'est une simple règle interne légale', 'Il faut payer une taxe supplémentaire'], correctIndex: 0 },
    { text: 'En France, jusqu\'à quel âge l\'instruction est-elle obligatoire ?', options: ['16 ans', '12 ans', '18 ans', '21 ans'], correctIndex: 0 },
    { text: '[Mise en situation] Vous êtes malade et ne pouvez pas vous rendre au travail. Quel document devez-vous envoyer à l\'employeur sous 48h ?', options: ['Un avis d\'arrêt de travail établi par un médecin', 'Une simple lettre manuscrite sans certificat', 'Une ordonnance de médicaments', 'Une attestation de domicile'], correctIndex: 0 },
    { text: 'Quels sont les trois symboles de la République française ?', options: ['Le drapeau tricolore, la Marseillaise et Marianne', 'Le coq, la Tour Eiffel et le Louvre', 'L\'arc de triomphe, la devise et le blason', 'La couronne, le sceau et le drapeau'], correctIndex: 0 },
    { text: '[Mise en situation] Vous êtes témoin d\'un accident de la circulation grave. Quel numéro gratuit contacter en priorité ?', options: ['Le 112 (Numéro d\'urgence européen)', 'Le 3615', 'Le 118 218', 'Le numéro de la mairie'], correctIndex: 0 },
    { text: 'Qui vote le budget et les lois en France ?', options: ['Le Parlement (Assemblée nationale et Sénat)', 'Le Président de la République seul', 'Le Conseil constitutionnel', 'Les préfets'], correctIndex: 0 },
    { text: '[Mise en situation] En tant que citoyen résident en France, respecter les lois de la République est :', options: ['Une obligation légale pour tous', 'Une option facultative', 'Réservé uniquement aux personnes nées en France', 'Obligatoire seulement le week-end'], correctIndex: 0 }
  ],

  // --- PARCOURS SPÉCIFIQUES ---
  'CSP': [
    { text: 'Quelle est la devise officielle de la République française ?', options: ['Liberté, Égalité, Fraternité', 'Travail, Famille, Patrie', 'Justice, Paix, Unité', 'Sécurité et Propriété'], correctIndex: 0 },
    { text: '[Mise en situation] La préfecture vous demande un justificatif de domicile. Quel document pouvez-vous fournir ?', options: ['Une facture d\'électricité de moins de 6 mois', 'Une carte bancaire', 'Un diplôme', 'Une fiche de paie d\'il y a 2 ans'], correctIndex: 0 },
    { text: 'En France, à quel âge l\'instruction est-elle obligatoire pour tous les enfants ?', options: ['3 ans', '6 ans', '10 ans', '16 ans'], correctIndex: 0 },
    { text: '[Mise en situation] Vous êtes malade et ne pouvez pas aller travailler. Que devez-vous faire sous 48h ?', options: ['Envoyer un arrêt de travail à l\'employeur et à la CPAM', 'Attendre de guérir avant d\'avertir la société', 'Rendre visite à la mairie', 'Poster un message sur les réseaux sociaux'], correctIndex: 0 },
    { text: 'L\'expression : \'Demain, ils ___ le nouveau formulaire en ligne.\'', options: ['rempliront', 'remplissaient', 'ont rempli', 'remplir'], correctIndex: 0 },
    { text: 'Quel est le symbole républicain qui représente la République française ?', options: ['Marianne', 'Jeanne d\'Arc', 'La Joconde', 'Marie Curie'], correctIndex: 0 },
    { text: '[Mise en situation] Votre propriétaire souhaite augmenter le loyer sans motif légal en cours de bail. Que pouvez-vous faire ?', options: ['Consulter l\'ADIL ou une association de consommateurs', 'Arrêter immédiatement de payer', 'Changer les serrures sans prévenir', 'Contacter le Préfet'], correctIndex: 0 },
    { text: 'Trouvez le synonyme du mot \'Demander\' :', options: ['Solliciter', 'Refuser', 'Exiger', 'Abandonner'], correctIndex: 0 },
    { text: 'Quels sont les trois couleurs du drapeau français ?', options: ['Bleu, Blanc, Rouge', 'Vert, Blanc, Rouge', 'Bleu, Jaune, Rouge', 'Rouge, Blanc, Noir'], correctIndex: 0 },
    { text: '[Mise en situation] Si vous changez d\'adresse postale, dans quel délai devez-vous le déclarer à l\'administration ?', options: ['Dans un délai de 3 mois', 'Ce n\'est pas obligatoire', 'Après 2 ans', 'Uniquement au renouvellement du titre'], correctIndex: 0 }
  ],

  'CR': [
    { text: 'Quel principe garantit la séparation des religions et de la puissance publique en France ?', options: ['La laïcité', 'La souveraineté', 'La république', 'La décentralisation'], correctIndex: 0 },
    { text: '[Mise en situation] Un employeur refuse de vous embaucher en raison de votre origine. Comment qualifie-t-on cet acte ?', options: ['Une discrimination (délit puni par la loi)', 'Une liberté de choix du recruteur', 'Une erreur administrative', 'Une infraction au code de la route'], correctIndex: 0 },
    { text: 'Combien de départements compte la France métropolitaine et d\'outre-mer au total ?', options: ['101', '95', '50', '120'], correctIndex: 0 },
    { text: 'Choisissez la forme correcte : \'Bien qu\'il ___ tard, nous terminons la démarche.\'', options: ['soit', 'est', 'était', 'sera'], correctIndex: 0 },
    { text: '[Mise en situation] En cas de litige impayé avec un commerçant, vers quelle instance gratuite de médiation s\'adresser ?', options: ['Le conciliateur de justice', 'La police judiciaire', 'Le tribunal correctionnel', 'Le ministère de l\'Intérieur'], correctIndex: 0 },
    { text: 'Qui élit les députés à l\'Assemblée nationale ?', options: ['Les citoyens français au suffrage universel direct', 'Le Président de la République', 'Les sénateurs', 'Les maires'], correctIndex: 0 },
    { text: 'Quel texte fondamental a été adopté en 1789 en France ?', options: ['La Déclaration des Droits de l\'Homme et du Citoyen', 'Le Code Civil', 'La Constitution de la Vème République', 'Le Traité de Rome'], correctIndex: 0 },
    { text: 'Complétez : \'Si nous avions eu le choix, nous ___ plus tôt.\'', options: ['serions partis', 'partons', 'partions', 'partiriez'], correctIndex: 0 },
    { text: '[Mise en situation] Vous êtes témoin d\'un accident grave sur la route. Quel est le numéro d\'urgence européen à composer ?', options: ['112', '118', '3615', '1014'], correctIndex: 0 },
    { text: 'Quelle est la durée du mandat du Président de la République française ?', options: ['5 ans', '7 ans', '4 ans', '6 ans'], correctIndex: 0 }
  ],

  'NAT': [
    { text: 'En quelle année la loi sur la séparation des Églises et de l\'État a-t-elle été votée ?', options: ['1905', '1789', '1848', '1958'], correctIndex: 0 },
    { text: 'Qui a fondé la Vème République en 1958 ?', options: ['Charles de Gaulle', 'François Mitterrand', 'Georges Pompidou', 'Jean Jaurès'], correctIndex: 0 },
    { text: '[Mise en situation] En tant que citoyen français, le droit de vote aux élections est :', options: ['Un droit et un devoir civique', 'Obligatoire sous peine d\'amende', 'Interdit aux salariés', 'Réservé aux plus de 25 ans'], correctIndex: 0 },
    { text: 'Quel événement marquant est célébré lors de la Fête Nationale du 14 juillet ?', options: ['La prise de la Bastille (1789)', 'La fin de la Première Guerre mondiale', 'La signature de la Constitution', 'L\'élection du premier Président'], correctIndex: 0 },
    { text: 'Complétez : \'Il convient que tout citoyen ___ aux règles républicaines.\'', options: ['se conforme', 'conforme', 's\'est conformé', 'se conformera'], correctIndex: 0 },
    { text: 'Où siège le Sénat en France ?', options: ['Au Palais du Luxembourg', 'Au Palais Bourbon', 'À l\'Élysée', 'À l\'Hôtel de Ville'], correctIndex: 0 },
    { text: '[Mise en situation] Vous êtes convoqué comme juré d\'assises. Quelle est votre obligation ?', options: ['Siéger est un devoir citoyen obligatoire (sauf motif grave)', 'Vous pouvez refuser sans justificatif', 'Vous devez payer une taxe', 'Seuls les avocats ont l\'obligation d\'y aller'], correctIndex: 0 },
    { text: 'Quel grand scientifique français a mis au point le vaccin contre la rage ?', options: ['Louis Pasteur', 'Marie Curie', 'Claude Bernard', 'Antoine Lavoisier'], correctIndex: 0 },
    { text: 'Quel est l\'hymne national français ?', options: ['La Marseillaise', 'Le Chant des Partisans', 'L\'Hymne à la Joie', 'La Parisienne'], correctIndex: 0 },
    { text: 'Quel organe vérifie la conformité des lois avec la Constitution ?', options: ['Le Conseil constitutionnel', 'La Cour de cassation', 'Le Conseil d\'État', 'Le Parlement européen'], correctIndex: 0 }
  ],

  // --- NIVEAUX CECRL ---
  'A1': [
    { text: 'Je ___ étudiant à SIDJI Formation.', options: ['suis', 'est', 'sont', 'avoir'], correctIndex: 0 },
    { text: 'Comment ___ -vous ?', options: ['allez', 'vas', 'aller', 'va'], correctIndex: 0 },
    { text: 'Il habite ___ Paris.', options: ['à', 'en', 'au', 'dans'], correctIndex: 0 },
    { text: 'Aujourd\'hui, il ___ beau.', options: ['fait', 'a', 'est', 'va'], correctIndex: 0 },
    { text: 'Quel jour vient après le mardi ?', options: ['Mercredi', 'Jeudi', 'Lundi', 'Vendredi'], correctIndex: 0 },
    { text: 'Nous ___ un cours de français.', options: ['avons', 'sommes', 'avez', 'ont'], correctIndex: 0 },
    { text: 'La voiture est ___ le garage.', options: ['dans', 'sur', 'à', 'en'], correctIndex: 0 },
    { text: 'Elles ___ très bien parler français.', options: ['savent', 'sait', 'savoir', 'pouvoir'], correctIndex: 0 },
    { text: 'Qu\'est-ce que vous ___ le week-end ?', options: ['faites', 'fais', 'faire', 'font'], correctIndex: 0 },
    { text: 'C\'est le livre ___ Paul.', options: ['de', 'à', 'pour', 'par'], correctIndex: 0 }
  ],

  'A2': [
    { text: 'Hier, nous ___ visiter un monument.', options: ['sommes allés', 'allons', 'allions', 'va'], correctIndex: 0 },
    { text: 'Demain, elle ___ à la préfecture.', options: ['ira', 'est allée', 'va aller', 'allait'], correctIndex: 0 },
    { text: 'Je n\'ai ___ compris à cet exercice.', options: ['rien', 'jamais', 'personne', 'aucun'], correctIndex: 0 },
    { text: 'C\'est l\'homme ___ m\'a aidé.', options: ['qui', 'que', 'où', 'dont'], correctIndex: 0 },
    { text: 'Il faut ___ les documents avant midi.', options: ['envoyer', 'envoyé', 'envoie', 'envoyions'], correctIndex: 0 },
    { text: 'Pendant que je dormais, le téléphone ___.', options: ['a sonné', 'sonne', 'sonner', 'va sonner'], correctIndex: 0 },
    { text: 'Vous devez vous présenter ___ guichet n°3.', options: ['au', 'à la', 'en', 'dans'], correctIndex: 0 },
    { text: 'Elle m\'a demandé ___ je voulais venir.', options: ['si', 'que', 'ce que', 'qui'], correctIndex: 0 },
    { text: 'Ils ont acheté une grande maison ___ jardin.', options: ['avec', 'sans', 'pour', 'chez'], correctIndex: 0 },
    { text: 'Merci de ___ répondre rapidement.', options: ['bien vouloir', 'vouloir bien', 'voulu', 'veut'], correctIndex: 0 }
  ],

  'B1': [
    { text: 'C\'est le dossier ___ je vous parlais ce matin.', options: ['dont', 'que', 'lequel', 'où'], correctIndex: 0 },
    { text: 'Il est nécessaire que vous ___ ce formulaire.', options: ['remplissiez', 'remplissez', 'remplir', 'remplirez'], correctIndex: 0 },
    { text: 'Si j\'avais plus de temps, je ___ ce stage.', options: ['ferais', 'fais', 'ferai', 'fasse'], correctIndex: 0 },
    { text: 'Elle a réussi son examen ___ de nombreuses difficultés.', options: ['malgré', 'bien que', 'à cause de', 'grâce à'], correctIndex: 0 },
    { text: 'Les mesures ont été ___ par la direction.', options: ['approuvées', 'approuvé', 'approuver', 'approuverait'], correctIndex: 0 },
    { text: 'Je cherche quelqu\'un qui ___ m\'orienter.', options: ['puisse', 'peut', 'pourra', 'pouvait'], correctIndex: 0 },
    { text: 'Avant de ___, vérifiez vos pièces justificatives.', options: ['partir', 'parti', 'parte', 'partirez'], correctIndex: 0 },
    { text: 'Ce travail demande de la rigueur ___ de la patience.', options: ['ainsi que', 'alors que', 'afin que', 'pour que'], correctIndex: 0 },
    { text: 'Il s\'est inscrit ___ améliorer son français.', options: ['afin d\'', 'parce qu\'', 'comme', 'car'], correctIndex: 0 },
    { text: 'Bien qu\'il ___ froid, il est venu au rendez-vous.', options: ['fasse', 'fait', 'faisait', 'fera'], correctIndex: 0 }
  ],

  'B2': [
    { text: 'Il est peu probable qu\'ils ___ à temps sans aide.', options: ['parviennent', 'parviendront', 'parvenaient', 'parviendrais'], correctIndex: 0 },
    { text: 'Quoi que vous ___, respectez la réglementation.', options: ['fassiez', 'faites', 'ferez', 'feriez'], correctIndex: 0 },
    { text: 'S\'il avait révisé, il ___ son test sans problème.', options: ['aurait obtenu', 'obtiendra', 'a obtenu', 'obtienne'], correctIndex: 0 },
    { text: 'À moins que vous n\'___ un justificatif, la demande sera rejetée.', options: ['apportiez', 'apporterez', 'apportez', 'avez apporté'], correctIndex: 0 },
    { text: 'Cette réforme aura permis de ___ les démarches.', options: ['simplifier', 'simplification', 'simplifiant', 'simplifié'], correctIndex: 0 },
    { text: 'Sans votre intervention, le dossier ___ été perdu.', options: ['aurait', 'sera', 'est', 'soit'], correctIndex: 0 },
    { text: 'Il agit comme s\'il ___ le responsable du service.', options: ['était', 'est', 'soit', 'serait'], correctIndex: 0 },
    { text: 'C\'est une décision dont l\'impact est ___ à négliger.', options: ['loin d\'être', 'près d\'être', 'pas du tout', 'sans'], correctIndex: 0 },
    { text: 'Autant que je ___, les conditions restent inchangées.', options: ['sache', 'sais', 'saurai', 'suis'], correctIndex: 0 },
    { text: 'Ils ont poursuivi les négociations, ___ les divergences.', options: ['en dépit de', 'bien que', 'étant donné', 'vu que'], correctIndex: 0 }
  ]
};

// Test global 10 Q
questionBank['ALL'] = [
  questionBank['A1'][0], questionBank['A1'][1],
  questionBank['A2'][0], questionBank['A2'][1],
  questionBank['B1'][0], questionBank['B1'][1],
  questionBank['B2'][0], questionBank['B2'][1],
  questionBank['CSP'][0], questionBank['NAT'][0]
];

// ==========================================
// 2. VARIABLES D'ÉTAT GLOBALES
// ==========================================
let studentName = "";
let chosenTarget = "";
let activeQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let selectedOptionIndex = null;

// ==========================================
// 3. ÉLÉMENTS DU DOM
// ==========================================
const startContainer = document.getElementById('start-container');
const studentNameInput = document.getElementById('student-name');
const startBtn = document.getElementById('start-btn');
const levelSelectionContainer = document.getElementById('level-selection-container');

const quizContainer = document.getElementById('quiz-container');
const quizTitle = document.getElementById('quiz-title');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const skipBtn = document.getElementById('skip-btn');

const resultContainer = document.getElementById('result-container');

// ==========================================
// 4. FONCTIONS UTILITAIRES & ALGORITHMES
// ==========================================
// Fisher-Yates shuffle
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ==========================================
// 5. GESTION DE L'UTILISATEUR & HISTORIQUE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const savedUser = localStorage.getItem('quiz_user');
  if (savedUser) {
    studentName = savedUser;
    afficherInterfaceUtilisateur(studentName);
  }

  // Écouteur sur la saisie initiale si le bouton existe
  if (startBtn) {
    startBtn.onclick = () => {
      const nom = studentNameInput ? studentNameInput.value.trim() : '';
      if (!nom) {
        alert('Veuillez entrer votre prénom et nom.');
        return;
      }
      validerUtilisateur(nom);
    };
  }

  // Écouteur sur le changement d'utilisateur
  document.getElementById('change-user-btn')?.addEventListener('click', () => {
    localStorage.removeItem('quiz_user');
    location.reload();
  });
});

function validerUtilisateur(nomSaisi) {
  const nomPropre = nomSaisi.trim();
  if (!nomPropre) return;

  studentName = nomPropre;
  localStorage.setItem('quiz_user', studentName);
  afficherInterfaceUtilisateur(studentName);
}

async function afficherInterfaceUtilisateur(nom) {

    const nameDisplay = document.getElementById('user-name-display');
    const userHeader = document.getElementById('user-header');
    const inputContainer = document.getElementById('name-input-container');
    const historyContainer = document.getElementById('history-list');

    // ==========================================
    // AFFICHAGE DU NOM
    // ==========================================

    if (nameDisplay) {
        nameDisplay.textContent = nom;
    }

    if (userHeader) {
        userHeader.classList.remove('hidden');
    }

    if (inputContainer) {
        inputContainer.classList.add('hidden');
    }

    if (startContainer) {
        startContainer.classList.add('hidden');
    }

    if (levelSelectionContainer) {
        levelSelectionContainer.classList.remove('hidden');
    }

    // ==========================================
    // VÉRIFICATION DU CONTENEUR HISTORIQUE
    // ==========================================

    if (!historyContainer) {
        console.error("❌ #history-list introuvable.");
        return;
    }

    // Message temporaire
    historyContainer.innerHTML = `
        <p class="no-history">
            Chargement de votre historique...
        </p>
    `;

    // ==========================================
    // RÉCUPÉRATION DE L'HISTORIQUE
    // ==========================================

    try {

        console.log(
            "🔎 Recherche historique pour :",
            nom
        );

        const url =
            `${API_URL}/api/historique/${encodeURIComponent(nom)}`;

        console.log(
            "🌐 URL appelée :",
            url
        );

        const response = await fetch(url);

        console.log(
            "📡 Statut HTTP :",
            response.status
        );

        if (!response.ok) {

            throw new Error(
                `Erreur HTTP ${response.status}`
            );
        }

        const historique = await response.json();

        console.log(
            "📦 Historique reçu :",
            historique
        );

        // ==========================================
        // AUCUN RÉSULTAT
        // ==========================================

        if (
            !Array.isArray(historique) ||
            historique.length === 0
        ) {

            historyContainer.innerHTML = `
                <p class="no-history">
                    Aucun test effectué pour le moment.
                </p>
            `;

            return;
        }

        // ==========================================
        // AFFICHAGE
        // ==========================================

        historyContainer.innerHTML = '';

        historique
            .slice(0, 3)
            .forEach(item => {

                let date = 'Date inconnue';

                if (item.date_passage) {

                    const parsedDate =
                        new Date(item.date_passage);

                    if (!isNaN(parsedDate.getTime())) {

                        date =
                            parsedDate.toLocaleDateString(
                                'fr-FR',
                                {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                }
                            );
                    }
                }

                const card =
                    document.createElement('div');

                card.className =
                    'history-item';

                card.innerHTML = `
                    <span class="history-module">
                        ${item.niveau_estime || 'Test'}
                    </span>

                    <span class="history-score">
                        <strong>
                            ${item.score ?? 0}
                        </strong>
                        /
                        ${item.total_questions ?? 10}
                    </span>

                    <span class="history-date">
                        ${date}
                    </span>
                `;

                historyContainer.appendChild(card);
            });

    } catch (err) {

        console.error(
            "❌ Erreur chargement historique :",
            err
        );

        historyContainer.innerHTML = `
            <p class="no-history">
                Impossible de charger votre historique.
            </p>
        `;
    }
}

// ==========================================
// 6. SÉLECTION ET DÉROULEMENT DU QUIZ
// ==========================================
function selectLevel(target) {
  chosenTarget = target;
  
  const rawQuestions = questionBank[target] || questionBank['ALL'];
  
  // Cloner et mélanger les options de chaque question
  activeQuestions = rawQuestions.map(q => {
    const originalCorrectIndex = typeof q.correctIndex === 'number' ? q.correctIndex : 0;
    const correctAnswerText = q.options[originalCorrectIndex];
    const shuffledOptions = shuffleArray(q.options);
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);
    
    return {
      text: q.text,
      options: shuffledOptions,
      correct: newCorrectIndex
    };
  });

  const titles = {
    'GRAMMAR': 'Module : Structure de la langue (Grammaire & Vocabulaire)',
    'READING': 'Module : Compréhension écrite (Lecture & Analyse)',
    'CIVIC_SKILL': 'Module : Culture Civique & Mises en situation',
    'CSP': 'Quizz Carte de Séjour Pluriannuelle (10 Questions)',
    'CR': 'Quizz Carte de Résident (10 Questions)',
    'NAT': 'Quizz Naturalisation (10 Questions)',
    'A1': 'Entraînement Français - Niveau A1 (10 Questions)',
    'A2': 'Entraînement Français - Niveau A2 (10 Questions)',
    'B1': 'Entraînement Français - Niveau B1 (10 Questions)',
    'B2': 'Entraînement Français - Niveau B2 (10 Questions)',
    'ALL': 'Test de Positionnement Global TCF (10 Questions)'
  };

  if (quizTitle) quizTitle.textContent = titles[target] || 'Quiz d\'évaluation (10 Questions)';

  levelSelectionContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');

  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  loadQuestion();
}

function loadQuestion() {
  selectedOptionIndex = null;
  const q = activeQuestions[currentQuestionIndex];
  
  if (questionText) {
    questionText.textContent = `Question ${currentQuestionIndex + 1}/${activeQuestions.length} : ${q.text}`;
  }
  
  if (optionsContainer) {
    optionsContainer.innerHTML = '';
    q.options.forEach((opt, index) => {
      const btn = document.createElement('button');
      btn.classList.add('option-btn');
      btn.textContent = opt;
      btn.onclick = () => selectOption(btn, index);
      optionsContainer.appendChild(btn);
    });
  }
}

function selectOption(selectedBtn, index) {
  const buttons = optionsContainer.querySelectorAll('.option-btn');
  buttons.forEach(b => b.classList.remove('selected'));
  selectedBtn.classList.add('selected');
  selectedOptionIndex = index;
}

// Actions des boutons
if (nextBtn) {
  nextBtn.onclick = () => {
    if (selectedOptionIndex === null) {
      alert('Veuillez sélectionner une réponse ou cliquer sur \'Je ne sais pas (Passer)\'.');
      return;
    }
    processAnswer(false);
  };
}

if (skipBtn) {
  skipBtn.onclick = () => {
    processAnswer(true);
  };
}

function processAnswer(isSkipped) {
  const q = activeQuestions[currentQuestionIndex];

  if (isSkipped) {
    userAnswers.push({
      question: q.text,
      userAns: 'Non répondu (Je ne sais pas)',
      correctAns: q.options[q.correct],
      isCorrect: false,
      isSkipped: true
    });
  } else {
    const isCorrect = selectedOptionIndex === q.correct;
    if (isCorrect) score++;

    userAnswers.push({
      question: q.text,
      userAns: q.options[selectedOptionIndex],
      correctAns: q.options[q.correct],
      isCorrect: isCorrect,
      isSkipped: false
    });
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < activeQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// ==========================================
// 7. BDD & SAUVEGARDE
// ==========================================
async function sauvegarderResultatBDD(
    nom,
    score,
    total,
    niveau,
    reponses
) {

    try {

        console.log("💾 Sauvegarde du résultat...");

        const response = await fetch(
            `${API_URL}/api/sauvegarder`,
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    nom: nom,
                    score: score,
                    total: total,
                    niveau: niveau,
                    reponses: reponses
                })
            }
        );

        console.log(
            "📡 Statut sauvegarde :",
            response.status
        );

        if (!response.ok) {

            throw new Error(
                `Erreur HTTP ${response.status}`
            );
        }

        const data = await response.json();

        console.log(
            "📦 Réponse sauvegarde :",
            data
        );

        if (
            data.message === 'Succès' ||
            data.success === true
        ) {

            console.log(
                "✅ Résultat enregistré en BDD."
            );

            return true;
        }

        console.error(
            "❌ Erreur serveur :",
            data.error
        );

        return false;

    } catch (err) {

        console.error(
            "❌ Erreur sauvegarde :",
            err
        );

        return false;
    }
}// ==========================================
// 7. BDD & SAUVEGARDE
// ==========================================
async function sauvegarderResultatBDD(
    nom,
    score,
    total,
    niveau,
    reponses
) {
    try {
        console.log("💾 Tentative de sauvegarde vers Alwaysdata...");

        const response = await fetch(
            `${API_URL}/api/sauvegarder`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom: nom,
                    score: score,
                    total: total,
                    niveau: niveau,
                    reponses: reponses
                })
            }
        );

        console.log("📡 Statut HTTP sauvegarde :", response.status);

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status} - Vérifie ton serveur Flask sur Alwaysdata`);
        }

        const data = await response.json();
        console.log("📦 Réponse du serveur :", data);

        // Vérification large selon la structure de retour de ton Flask
        if (data.success === true || data.message === 'Succès' || response.ok) {
            console.log("✅ Résultat enregistré avec succès dans phpMyAdmin.");
            return true;
        }

        console.error("❌ Erreur renvoyée par le serveur :", data.error || data);
        return false;

    } catch (err) {
        console.error("❌ Erreur réseau ou blocage CORS lors de la sauvegarde :", err);
        return false;
    }
}

// ==========================================
// 8. AFFICHAGE DES RÉSULTATS
// ==========================================
async function showResults() {
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');

  const total = activeQuestions.length;
  const correctPercent = Math.round((score / total) * 100);
  const incorrectPercent = 100 - correctPercent;

  const studentInfoEl = document.getElementById('student-info');
  const levelInfoEl = document.getElementById('selected-level-info');
  const scoreTextEl = document.getElementById('score-text');
  const levelTextEl = document.getElementById('level-text');

  if (studentInfoEl) studentInfoEl.innerHTML = `<strong>Apprenant :</strong> ${studentName}`;
  if (levelInfoEl) levelInfoEl.innerHTML = `<strong>Module / Objectif :</strong> ${chosenTarget}`;
  if (scoreTextEl) scoreTextEl.innerHTML = `<strong>Score global :</strong> ${score} / ${total}`;
  if (levelTextEl) {
    levelTextEl.innerHTML = `<strong>Résultat :</strong> ${
      correctPercent >= 70 ? 'Module Validé ✅' : 'Renforcement Recommandé ⚠️'
    }`;
  }

  // Graphique camembert
  const donutChart = document.getElementById('donut-chart');
  const donutCenter = document.getElementById('donut-center');
  const correctPercentEl = document.getElementById('correct-percent');
  const incorrectPercentEl = document.getElementById('incorrect-percent');

  if (correctPercentEl) correctPercentEl.textContent = `${correctPercent}%`;
  if (incorrectPercentEl) incorrectPercentEl.textContent = `${incorrectPercent}%`;
  if (donutCenter) donutCenter.textContent = `${correctPercent}%`;
  if (donutChart) {
    donutChart.style.background = `conic-gradient(#4caf50 0% ${correctPercent}%, #f44336 ${correctPercent}% 100%)`;
  }

  // Recommandations
  const hoursBox = document.getElementById('hours-recommendation');
  if (hoursBox) {
    let hoursHTML = `<h3>Préconisation du parcours de formation :</h3>`;
    if (correctPercent >= 80) {
      hoursHTML += `<p><strong>Excellent résultat !</strong> Compétence bien assimilée. Vous êtes prêt pour la suite de votre parcours.</p>`;
    } else if (correctPercent >= 50) {
      hoursHTML += `<p>Niveau moyen sur ce domaine. Un module court de <strong>10 à 15 heures de renforcement</strong> est recommandé.</p>`;
    } else {
      hoursHTML += `<p>Plusieurs notions manquées ou ignorées. Un parcours renforcé de <strong>25 à 30 heures d'apprentissage ciblé</strong> est préconisé.</p>`;
    }
    hoursBox.innerHTML = hoursHTML;
  }

  // Détail des réponses
  const detailsContainer = document.getElementById('details-container');
  if (detailsContainer) {
    detailsContainer.innerHTML = `<h3 class='card-title'>Détail des ${total} réponses :</h3>`;
    userAnswers.forEach((ans, i) => {
      const item = document.createElement('div');
      if (ans.isSkipped) {
        item.classList.add('result-item', 'skipped');
        item.innerHTML = `
          <p><strong>Q${i + 1} :</strong> ${ans.question}</p>
          <p>Votre réponse : <em>⚪ Pas de réponse (Question passée)</em></p>
          <p>Bonne réponse : <strong>${ans.correctAns}</strong></p>
        `;
      } else if (ans.isCorrect) {
        item.classList.add('result-item', 'correct');
        item.innerHTML = `
          <p><strong>Q${i + 1} :</strong> ${ans.question}</p>
          <p>Votre réponse : <em>${ans.userAns}</em> ✅</p>
        `;
      } else {
        item.classList.add('result-item', 'incorrect');
        item.innerHTML = `
          <p><strong>Q${i + 1} :</strong> ${ans.question}</p>
          <p>Votre réponse : <em>${ans.userAns}</em> ❌</p>
          <p>Bonne réponse : <strong>${ans.correctAns}</strong></p>
        `;
      }
      detailsContainer.appendChild(item);
    });
  }

  // Sauvegarde globale vers BDD
  const sauvegardeOK = await sauvegarderResultatBDD(
    studentName,
    score,
    total,
    chosenTarget,
    userAnswers
);

if (sauvegardeOK) {
    console.log("✅ Historique mis à jour.");
}
}

// Navigation de retour
function resetToHome() {
  quizContainer.classList.add('hidden');
  resultContainer.classList.add('hidden');

  if (studentName && studentName.trim() !== '') {
    levelSelectionContainer.classList.remove('hidden');
    afficherInterfaceUtilisateur(studentName); // Rafraîchit l'historique
  } else {
    levelSelectionContainer.classList.add('hidden');
    startContainer.classList.remove('hidden');
  }

  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  selectedOptionIndex = null;
}