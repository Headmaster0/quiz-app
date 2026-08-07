// Banque de questions : 10 questions strictes par catégorie / domaine
const questionBank = {
    // --- NOUVEAU : STRUCTURE DE LA LANGUE (GRAMMAIRE & VOCABULAIRE - 10 Q) ---
    "GRAMMAR": [
        { text: "Choisissez la forme correcte : 'Demain, ils ___ leurs documents à la préfecture.'", options: ["déposeront", "déposaient", "ont déposé", "déposer"], correct: 0 },
        { text: "Trouvez le synonyme du mot 'Obligatoire' :", options: ["Imposé", "Facultatif", "Interdit", "Optionnel"], correct: 0 },
        { text: "Complétez la phrase : 'Bien qu'elle ___ fatiguée, elle continue ses démarches.'", options: ["soit", "est", "était", "sera"], correct: 0 },
        { text: "Quel est le contraire de 'Augmenter' ?", options: ["Diminuer", "Multiplier", "Ajouter", "Élever"], correct: 0 },
        { text: "Choisissez le pronom relatif correct : 'Le dossier ___ je vous ai parlé est validé.'", options: ["dont", "que", "qui", "où"], correct: 0 },
        { text: "Complétez : 'Si nous avions reçu l'accord plus tôt, nous ___ ce stage.'", options: ["aurions commencé", "commençons", "commencerons", "commencions"], correct: 0 },
        { text: "Trouvez l'orthographe correcte :", options: ["Administration", "Administrasion", "Adminisstracion", "Adminitration"], correct: 0 },
        { text: "Complétez : 'Elle s'est inscrite à la formation ___ améliorer son niveau.'", options: ["afin d'", "parce qu'", "comme", "car"], correct: 0 },
        { text: "Quel est le pluriel de 'Un journal' ?", options: ["Des journaux", "Des journals", "Des journauxs", "Des journales"], correct: 0 },
        { text: "Complétez : 'Il faut que vous ___ présents à 9h00 précises.'", options: ["soyez", "êtes", "seriez", "étiez"], correct: 0 }
    ],

    // --- NOUVEAU : COMPRÉHENSION ÉCRITE (LECTURE & ANALYSE - 10 Q) ---
    "READING": [
        { text: "Texte : 'Horaires du guichet : Lundi au Vendredi de 8h30 à 12h00. Fermé l'après-midi.' Que comprendrez-vous ?", options: ["Le guichet est fermé l'après-midi", "Le guichet est ouvert le samedi matin", "Le guichet ouvre toute la journée", "Le guichet est réservé aux urgences"], correct: 0 },
        { text: "Texte : 'Pensez à vous munir de deux pièces d'identité originales.' Que signifie cette consigne ?", options: ["Apporter 2 documents d'identité originaux (pas de copies)", "Envoyer 2 photocopies par courrier", "Présenter 1 seul document", "Ne rien apporter de particulier"], correct: 0 },
        { text: "Texte : 'Toute demande incomplète sera automatiquement rejetée.' Que faut-il faire ?", options: ["Fournir l'intégralité des pièces demandées", "Envoyer seulement la moitié du dossier", "Payer des frais supplémentaires", "Attendre une relance téléphonique"], correct: 0 },
        { text: "Texte : 'Accès interdit sans badge d'identification.' Que signifie ce panneau ?", options: ["Seules les personnes ayant un badge peuvent entrer", "Entrée libre pour tout le monde", "Entrée réservée aux étudiants", "Port du masque obligatoire"], correct: 0 },
        { text: "Texte : 'En cas de changement d'adresse, signalez-le sous 30 jours.' Que devez-vous faire ?", options: ["Informer l'organisme dans un délai maximum d'un mois", "Changer immédiatement d'appartement", "Ne rien déclarer avant la fin d'année", "Rendre sa carte de séjour"], correct: 0 },
        { text: "Texte : 'Prenez rang au guichet n°4 dès le signal sonore.' Que devez-vous faire ?", options: ["Attendre le signal sonore avant d'aller au guichet 4", "Aller immédiatement au guichet 1", "Appeler un conseiller au téléphone", "Reprendre un nouveau ticket"], correct: 0 },
        { text: "Texte : 'Seules les convocations papier sont acceptées à l'entrée.' Que faut-il présenter ?", options: ["Un document imprimé", "Un SMS sur téléphone", "Une carte bancaire", "Une photo d'identité"], correct: 0 },
        { text: "Texte : 'Merci de maintenir le calme dans la salle d'attente.' Que demande ce message ?", options: ["Ne pas faire de bruit", "Attendre dehors", "Ne pas utiliser de stylos", "Éteindre les lumières"], correct: 0 },
        { text: "Texte : 'Paiement uniquement par carte bancaire.' Que pouvez-vous utiliser ?", options: ["Une carte bancaire (pas d'espèces)", "Des pièces de monnaie", "Un chèque cadeau", "Des billets de banque"], correct: 0 },
        { text: "Texte : 'Rendez-vous annulé en cas de retard supérieur à 15 minutes.' Que risque un retardataire ?", options: ["Perdre son rendez-vous", "Payer une amende", "Attendre 5 minutes de plus", "Repasser le lendemain sans convocation"], correct: 0 }
    ],

    // --- NOUVEAU : CULTURE CIVIQUE & MISES EN SITUATION (10 Q) ---
    "CIVIC_SKILL": [
        { text: "Quel principe garantit la neutralité de l'État vis-à-vis de toutes les religions ?", options: ["La laïcité", "La souveraineté", "La fraternité", "La décentralisation"], correct: 0 },
        { text: "[Mise en situation] Vous recevez un courrier de la CAF demandant une pièce justificative. Que devez-vous faire ?", options: ["Répondre dans les délais en envoyant le document réclamé", "Ignorer la lettre", "Attendre 6 mois", "Changer de numéro de téléphone"], correct: 0 },
        { text: "Quel est le rôle principal du Maire dans une commune ?", options: ["Administrer la commune et gérer l'état civil", "Voter les lois nationales", "Diriger l'armée", "Fixer les impôts nationaux"], correct: 0 },
        { text: "[Mise en situation] Vous cherchez un logement et l'agence refuse votre dossier à cause de votre origine. Que dit la loi ?", options: ["La discrimination est strictement interdite et punie par la loi", "L'agence a le droit de choisir selon l'origine", "C'est une simple règle interne légale", "Il faut payer une taxe supplémentaire"], correct: 0 },
        { text: "En France, jusqu'à quel âge l'instruction est-elle obligatoire ?", options: ["16 ans", "12 ans", "18 ans", "21 ans"], correct: 0 },
        { text: "[Mise en situation] Vous êtes malade et ne pouvez pas vous rendre au travail. Quel document devez-vous envoyer à l'employeur sous 48h ?", options: ["Un avis d'arrêt de travail établi par un médecin", "Une simple lettre manuscrite sans certificat", "Une ordonnance de médicaments", "Une attestation de domicile"], correct: 0 },
        { text: "Quels sont les trois symboles de la République française ?", options: ["Le drapeau tricolore, la Marseillaise et Marianne", "Le coq, la Tour Eiffel et le Louvre", "L'arc de triomphe, la devise et le blason", "La couronne, le sceau et le drapeau"], correct: 0 },
        { text: "[Mise en situation] Vous êtes témoin d'un accident de la circulation grave. Quel numéro gratuit contacter en priorité ?", options: ["Le 112 (Numéro d'urgence européen)", "Le 3615", "Le 118 218", "Le numéro de la mairie"], correct: 0 },
        { text: "Qui vote le budget et les lois en France ?", options: ["Le Parlement (Assemblée nationale et Sénat)", "Le Président de la République seul", "Le Conseil constitutionnel", "Les préfets"], correct: 0 },
        { text: "[Mise en situation] En tant que citoyen résident en France, respecter les lois de la République est :", options: ["Une obligation légale pour tous", "Une option facultative", "Réservé uniquement aux personnes nées en France", "Obligatoire seulement le week-end"], correct: 0 }
    ],

    // --- CARTE DE SÉJOUR PLURIANNUELLE (10 Q) ---
    "CSP": [
        { text: "Quelle est la devise officielle de la République française ?", options: ["Liberté, Égalité, Fraternité", "Travail, Famille, Patrie", "Justice, Paix, Unité", "Sécurité et Propriété"], correct: 0 },
        { text: "[Mise en situation] La préfecture vous demande un justificatif de domicile. Quel document pouvez-vous fournir ?", options: ["Une facture d'électricité de moins de 6 mois", "Une carte bancaire", "Un diplôme", "Une fiche de paie d'il y a 2 ans"], correct: 0 },
        { text: "En France, à quel âge l'instruction est-elle obligatoire pour tous les enfants ?", options: ["3 ans", "6 ans", "10 ans", "16 ans"], correct: 0 },
        { text: "[Mise en situation] Vous êtes malade et ne pouvez pas aller travailler. Que devez-vous faire sous 48h ?", options: ["Envoyer un arrêt de travail à l'employeur et à la CPAM", "Attendre de guérir avant d'avertir la société", "Rendre visite à la mairie", "Poster un message sur les réseaux sociaux"], correct: 0 },
        { text: "L'expression : 'Demain, ils ___ le nouveau formulaire en ligne.'", options: ["rempliront", "remplissaient", "ont rempli", "remplir"], correct: 0 },
        { text: "Quel est le symbole républicain qui représente la République française ?", options: ["Marianne", "Jeanne d'Arc", "La Joconde", "Marie Curie"], correct: 0 },
        { text: "[Mise en situation] Votre propriétaire souhaite augmenter le loyer sans motif légal en cours de bail. Que pouvez-vous faire ?", options: ["Consulter l'ADIL ou une association de consommateurs", "Arrêter immédiatement de payer", "Changer les serrures sans prévenir", "Contacter le Préfet"], correct: 0 },
        { text: "Trouvez le synonyme du mot 'Demander' :", options: ["Solliciter", "Refuser", "Exiger", "Abandonner"], correct: 0 },
        { text: "Quels sont les trois couleurs du drapeau français ?", options: ["Bleu, Blanc, Rouge", "Vert, Blanc, Rouge", "Bleu, Jaune, Rouge", "Rouge, Blanc, Noir"], correct: 0 },
        { text: "[Mise en situation] Si vous changez d'adresse postale, dans quel délai devez-vous le déclarer à l'administration ?", options: ["Dans un délai de 3 mois", "Ce n'est pas obligatoire", "Après 2 ans", "Uniquement au renouvellement du titre"], correct: 0 }
    ],

    // --- CARTE DE RÉSIDENT (10 Q) ---
    "CR": [
        { text: "Quel principe garantit la séparation des religions et de la puissance publique en France ?", options: ["La laïcité", "La souveraineté", "La république", "La décentralisation"], correct: 0 },
        { text: "[Mise en situation] Un employeur refuse de vous embaucher en raison de votre origine. Comment qualifie-t-on cet acte ?", options: ["Une discrimination (délit puni par la loi)", "Une liberté de choix du recruteur", "Une erreur administrative", "Une infraction au code de la route"], correct: 0 },
        { text: "Combien de départements compte la France métropolitaine et d'outre-mer au total ?", options: ["101", "95", "50", "120"], correct: 0 },
        { text: "Choisissez la forme correcte : 'Bien qu'il ___ tard, nous terminons la démarche.'", options: ["soit", "est", "était", "sera"], correct: 0 },
        { text: "[Mise en situation] En cas de litige impayé avec un commerçant, vers quelle instance gratuite de médiation s'adresser ?", options: ["Le conciliateur de justice", "La police judiciaire", "Le tribunal correctionnel", "Le ministère de l'Intérieur"], correct: 0 },
        { text: "Qui élit les députés à l'Assemblée nationale ?", options: ["Les citoyens français au suffrage universel direct", "Le Président de la République", "Les sénateurs", "Les maires"], correct: 0 },
        { text: "Quel texte fondamental a été adopté en 1789 en France ?", options: ["La Déclaration des Droits de l'Homme et du Citoyen", "Le Code Civil", "La Constitution de la Vème République", "Le Traité de Rome"], correct: 0 },
        { text: "Complétez : 'Si nous avions eu le choix, nous ___ plus tôt.'", options: ["serions partis", "partons", "partions", "partiriez"], correct: 0 },
        { text: "[Mise en situation] Vous êtes témoin d'un accident grave sur la route. Quel est le numéro d'urgence européen à composer ?", options: ["112", "118", "3615", "1014"], correct: 0 },
        { text: "Quelle est la durée du mandat du Président de la République française ?", options: ["5 ans", "7 ans", "4 ans", "6 ans"], correct: 0 }
    ],

    // --- NATURALISATION (10 Q) ---
    "NAT": [
        { text: "En quelle année la loi sur la séparation des Églises et de l'État a-t-elle été votée ?", options: ["1905", "1789", "1848", "1958"], correct: 0 },
        { text: "Qui a fondé la Vème République en 1958 ?", options: ["Charles de Gaulle", "François Mitterrand", "Georges Pompidou", "Jean Jaurès"], correct: 0 },
        { text: "[Mise en situation] En tant que citoyen français, le droit de vote aux élections est :", options: ["Un droit et un devoir civique", "Obligatoire sous peine d'amende", "Interdit aux salariés", "Réservé aux plus de 25 ans"], correct: 0 },
        { text: "Quel événement marquant est célébré lors de la Fête Nationale du 14 juillet ?", options: ["La prise de la Bastille (1789)", "La fin de la Première Guerre mondiale", "La signature de la Constitution", "L'élection du premier Président"], correct: 0 },
        { text: "Complétez : 'Il convient que tout citoyen ___ aux règles républicaines.'", options: ["se conforme", "conforme", "s'est conformé", "se conformera"], correct: 0 },
        { text: "Où siège le Sénat en France ?", options: ["Au Palais du Luxembourg", "Au Palais Bourbon", "À l'Élysée", "À l'Hôtel de Ville"], correct: 0 },
        { text: "[Mise en situation] Vous êtes convoqué comme juré d'assises. Quelle est votre obligation ?", options: ["Siéger est un devoir citoyen obligatoire (sauf motif grave)", "Vous pouvez refuser sans justificatif", "Vous devez payer une taxe", "Seuls les avocats ont l'obligation d'y aller"], correct: 0 },
        { text: "Quel grand scientifique français a mis au point le vaccin contre la rage ?", options: ["Louis Pasteur", "Marie Curie", "Claude Bernard", "Antoine Lavoisier"], correct: 0 },
        { text: "Quel est l'hymne national français ?", options: ["La Marseillaise", "Le Chant des Partisans", "L'Hymne à la Joie", "La Parisienne"], correct: 0 },
        { text: "Quel organe vérifie la conformité des lois avec la Constitution ?", options: ["Le Conseil constitutionnel", "La Cour de cassation", "Le Conseil d'État", "Le Parlement européen"], correct: 0 }
    ],

    // --- ENTRAÎNEMENT PUR PAR NIVEAU CECRL (10 Q par niveau) ---
    "A1": [
        { text: "Je ___ étudiant à SIDJI Formation.", options: ["suis", "est", "sont", "avoir"], correct: 0 },
        { text: "Comment ___ -vous ?", options: ["allez", "vas", "aller", "va"], correct: 0 },
        { text: "Il habite ___ Paris.", options: ["à", "en", "au", "dans"], correct: 0 },
        { text: "Aujourd'hui, il ___ beau.", options: ["fait", "a", "est", "va"], correct: 0 },
        { text: "Quel jour vient après le mardi ?", options: ["Mercredi", "Jeudi", "Lundi", "Vendredi"], correct: 0 },
        { text: "Nous ___ un cours de français.", options: ["avons", "sommes", "avez", "ont"], correct: 0 },
        { text: "La voiture est ___ le garage.", options: ["dans", "sur", "à", "en"], correct: 0 },
        { text: "Elles ___ très bien parler français.", options: ["savent", "sait", "savoir", "pouvoir"], correct: 0 },
        { text: "Qu'est-ce que vous ___ le week-end ?", options: ["faites", "fais", "faire", "font"], correct: 0 },
        { text: "C'est le livre ___ Paul.", options: ["de", "à", "pour", "par"], correct: 0 }
    ],

    "A2": [
        { text: "Hier, nous ___ visiter un monument.", options: ["sommes allés", "allons", "allions", "va"], correct: 0 },
        { text: "Demain, elle ___ à la préfecture.", options: ["ira", "est allée", "va aller", "allait"], correct: 0 },
        { text: "Je n'ai ___ compris à cet exercice.", options: ["rien", "jamais", "personne", "aucun"], correct: 0 },
        { text: "C'est l'homme ___ m'a aidé.", options: ["qui", "que", "où", "dont"], correct: 0 },
        { text: "Il faut ___ les documents avant midi.", options: ["envoyer", "envoyé", "envoie", "envoyions"], correct: 0 },
        { text: "Pendant que je dormais, le téléphone ___.", options: ["a sonné", "sonne", "sonner", "va sonner"], correct: 0 },
        { text: "Vous devez vous présenter ___ guichet n°3.", options: ["au", "à la", "en", "dans"], correct: 0 },
        { text: "Elle m'a demandé ___ je voulais venir.", options: ["si", "que", "ce que", "qui"], correct: 0 },
        { text: "Ils ont acheté une grande maison ___ jardin.", options: ["avec", "sans", "pour", "chez"], correct: 0 },
        { text: "Merci de ___ répondre rapidement.", options: ["bien vouloir", "vouloir bien", "voulu", "veut"], correct: 0 }
    ],

    "B1": [
        { text: "C'est le dossier ___ je vous parlais ce matin.", options: ["dont", "que", "lequel", "où"], correct: 0 },
        { text: "Il est nécessaire que vous ___ ce formulaire.", options: ["remplissiez", "remplissez", "remplir", "remplirez"], correct: 0 },
        { text: "Si j'avais plus de temps, je ___ ce stage.", options: ["ferais", "fais", "ferai", "fasse"], correct: 0 },
        { text: "Elle a réussi son examen ___ de nombreuses difficultés.", options: ["malgré", "bien que", "à cause de", "grâce à"], correct: 0 },
        { text: "Les mesures ont été ___ par la direction.", options: ["approuvées", "approuvé", "approuver", "approuverait"], correct: 0 },
        { text: "Je cherche quelqu'un qui ___ m'orienter.", options: ["puisse", "peut", "pourra", "pouvait"], correct: 0 },
        { text: "Avant de ___, vérifiez vos pièces justificatives.", options: ["partir", "parti", "parte", "partirez"], correct: 0 },
        { text: "Ce travail demande de la rigueur ___ de la patience.", options: ["ainsi que", "alors que", "afin que", "pour que"], correct: 0 },
        { text: "Il s'est inscrit ___ améliorer son français.", options: ["afin d'", "parce qu'", "comme", "car"], correct: 0 },
        { text: "Bien qu'il ___ froid, il est venu au rendez-vous.", options: ["fasse", "fait", "faisait", "fera"], correct: 0 }
    ],

    "B2": [
        { text: "Il est peu probable qu'ils ___ à temps sans aide.", options: ["parviennent", "parviendront", "parviennent", "parvenaient"], correct: 0 },
        { text: "Quoi que vous ___, respectez la réglementation.", options: ["fassiez", "faites", "ferez", "feriez"], correct: 0 },
        { text: "S'il avait révisé, il ___ son test sans problème.", options: ["aurait obtenu", "obtiendra", "a obtenu", "obtienne"], correct: 0 },
        { text: "À moins que vous n'___ un justificatif, la demande sera rejetée.", options: ["apportiez", "apporterez", "apportez", "avez apporté"], correct: 0 },
        { text: "Cette réforme aura permis de ___ les démarches.", options: ["simplifier", "simplification", "simplifiant", "simplifié"], correct: 0 },
        { text: "Sans votre intervention, le dossier ___ été perdu.", options: ["aurait", "sera", "est", "soit"], correct: 0 },
        { text: "Il agit comme s'il ___ le responsable du service.", options: ["était", "est", "soit", "serait"], correct: 0 },
        { text: "C'est une décision dont l'impact est ___ à négliger.", options: ["loin d'être", "près d'être", "pas du tout", "sans"], correct: 0 },
        { text: "Autant que je ___, les conditions restent inchangées.", options: ["sache", "sais", "saurai", "suis"], correct: 0 },
        { text: "Ils ont poursuivi les négociations, ___ les divergences.", options: ["en dépit de", "bien que", "étant donné", "vu que"], correct: 0 }
    ]
};

// Test global 10 Q pour 'ALL'
questionBank["ALL"] = [
    questionBank["A1"][0], questionBank["A1"][1],
    questionBank["A2"][0], questionBank["A2"][1],
    questionBank["B1"][0], questionBank["B1"][1],
    questionBank["B2"][0], questionBank["B2"][1],
    questionBank["CSP"][0], questionBank["NAT"][0]
];

// Variables d'état
let activeQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let selectedOptionIndex = null;
let studentName = "";
let chosenTarget = "";

// Éléments HTML
const startContainer = document.getElementById("start-container");
const startBtn = document.getElementById("start-btn");
const studentNameInput = document.getElementById("student-name");
const levelSelectionContainer = document.getElementById("level-selection-container");
const quizContainer = document.getElementById("quiz-container");
const quizTitle = document.getElementById("quiz-title");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const skipBtn = document.getElementById("skip-btn");
const resultContainer = document.getElementById("result-container");

// Étape 1 : Saisie du nom
startBtn.onclick = () => {
    studentName = studentNameInput.value.trim();
    if (studentName === "") {
        alert("Veuillez entrer votre prénom et nom.");
        return;
    }
    startContainer.classList.add("hidden");
    levelSelectionContainer.classList.remove("hidden");
};

// Étape 2 : Sélection du parcours ou du domaine
function selectLevel(target) {
    chosenTarget = target;
    activeQuestions = questionBank[target] || questionBank["ALL"];

    const titles = {
        "GRAMMAR": "Module : Structure de la langue (Grammaire & Vocabulaire)",
        "READING": "Module : Compréhension écrite (Lecture & Analyse)",
        "CIVIC_SKILL": "Module : Culture Civique & Mises en situation",
        "CSP": "Quizz Carte de Séjour Pluriannuelle (10 Questions)",
        "CR": "Quizz Carte de Résident (10 Questions)",
        "NAT": "Quizz Naturalisation (10 Questions)",
        "A1": "Entraînement Français - Niveau A1 (10 Questions)",
        "A2": "Entraînement Français - Niveau A2 (10 Questions)",
        "B1": "Entraînement Français - Niveau B1 (10 Questions)",
        "B2": "Entraînement Français - Niveau B2 (10 Questions)",
        "ALL": "Test de Positionnement Global TCF (10 Questions)"
    };

    quizTitle.textContent = titles[target] || "Quiz d'évaluation (10 Questions)";

    levelSelectionContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    loadQuestion();
}

// Charger la question
function loadQuestion() {
    selectedOptionIndex = null;
    const q = activeQuestions[currentQuestionIndex];
    questionText.textContent = `Question ${currentQuestionIndex + 1}/10 : ${q.text}`;
    optionsContainer.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = opt;
        btn.onclick = () => selectOption(btn, index);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(selectedBtn, index) {
    const buttons = optionsContainer.querySelectorAll(".option-btn");
    buttons.forEach(b => b.classList.remove("selected"));
    selectedBtn.classList.add("selected");
    selectedOptionIndex = index;
}

// Bouton : Valider la réponse
nextBtn.onclick = () => {
    if (selectedOptionIndex === null) {
        alert("Veuillez sélectionner une réponse ou cliquer sur 'Je ne sais pas (Passer)'.");
        return;
    }
    processAnswer(false);
};

// Bouton : Je ne sais pas / Passer
skipBtn.onclick = () => {
    processAnswer(true);
};

function processAnswer(isSkipped) {
    const q = activeQuestions[currentQuestionIndex];
    
    if (isSkipped) {
        userAnswers.push({
            question: q.text,
            userAns: "Non répondu (Je ne sais pas)",
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

// Affichage du bilan final
function showResults() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    const total = 10;
    const correctPercent = Math.round((score / total) * 100);
    const incorrectPercent = 100 - correctPercent;

    document.getElementById("student-info").innerHTML = `<strong>Apprenant :</strong> ${studentName}`;
    document.getElementById("selected-level-info").innerHTML = `<strong>Module / Objectif :</strong> ${chosenTarget}`;
    document.getElementById("score-text").innerHTML = `<strong>Score global :</strong> ${score} / ${total}`;
    document.getElementById("level-text").innerHTML = `<strong>Résultat :</strong> ${correctPercent >= 70 ? "Module Validé ✅" : "Renforcement Recommandé ⚠️"}`;

    // Graphique camembert
    const donutChart = document.getElementById("donut-chart");
    const donutCenter = document.getElementById("donut-center");
    document.getElementById("correct-percent").textContent = `${correctPercent}%`;
    document.getElementById("incorrect-percent").textContent = `${incorrectPercent}%`;
    donutCenter.textContent = `${correctPercent}%`;
    donutChart.style.background = `conic-gradient(#4caf50 0% ${correctPercent}%, #f44336 ${correctPercent}% 100%)`;

    // Recommandation d'heures
    const hoursBox = document.getElementById("hours-recommendation");
    let hoursHTML = `<h3>Préconisation du parcours de formation :</h3>`;

    if (correctPercent >= 80) {
        hoursHTML += `<p><strong>Excellent résultat !</strong> Compétence bien assimilée. Vous êtes prêt pour la suite de votre parcours.</p>`;
    } else if (correctPercent >= 50) {
        hoursHTML += `<p>Niveau moyen sur ce domaine. Un module court de <strong>10 à 15 heures de renforcement</strong> est recommandé.</p>`;
    } else {
        hoursHTML += `<p>Plusieurs notions manquées ou ignorées. Un parcours renforcé de <strong>25 à 30 heures d'apprentissage ciblé</strong> est préconisé.</p>`;
    }

    hoursBox.innerHTML = hoursHTML;

    // Détail des 10 réponses
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = "<h3 class='card-title'>Détail des 10 réponses :</h3>";
    userAnswers.forEach((ans, i) => {
        const item = document.createElement("div");
        
        if (ans.isSkipped) {
            item.classList.add("result-item", "skipped");
            item.innerHTML = `
                <p><strong>Q${i + 1} :</strong> ${ans.question}</p>
                <p>Votre réponse : <em>⚪ Pas de réponse (Question passée)</em></p>
                <p>Bonne réponse : <strong>${ans.correctAns}</strong></p>
            `;
        } else if (ans.isCorrect) {
            item.classList.add("result-item", "correct");
            item.innerHTML = `
                <p><strong>Q${i + 1} :</strong> ${ans.question}</p>
                <p>Votre réponse : <em>${ans.userAns}</em> ✅</p>
            `;
        } else {
            item.classList.add("result-item", "incorrect");
            item.innerHTML = `
                <p><strong>Q${i + 1} :</strong> ${ans.question}</p>
                <p>Votre réponse : <em>${ans.userAns}</em> ❌</p>
                <p>Bonne réponse : <strong>${ans.correctAns}</strong></p>
            `;
        }
        
        detailsContainer.appendChild(item);
    });
    // Remplace les variables par les noms réels utilisés dans ton script.js :
sauvegarderResultatBDD(studentName, score, activeQuestions.length, chosenTarget);
}
// Fonction pour retourner à la sélection principale lors du clic sur le logo
function resetToHome() {
    if (studentName && studentName.trim() !== "") {
        quizContainer.classList.add("hidden");
        resultContainer.classList.add("hidden");
        startContainer.classList.add("hidden");
        levelSelectionContainer.classList.remove("hidden");
    } else {
        quizContainer.classList.add("hidden");
        resultContainer.classList.add("hidden");
        levelSelectionContainer.classList.add("hidden");
        startContainer.classList.remove("hidden");
    }

    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    selectedOptionIndex = null;
}
// Fonction qui envoie les résultats au serveur Python
function sauvegarderResultatBDD(nom, score, total, niveau) {
    fetch('/api/sauvegarder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nom: nom,
            score: score,
            total: total,
            niveau: niveau
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("✅ Résultat enregistré en base SQL !");
        } else {
            console.error("❌ Erreur serveur :", data.error);
        }
    })
    .catch(error => {
        console.error("❌ Erreur de connexion au serveur :", error);
    });
}