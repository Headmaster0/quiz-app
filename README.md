# quiz-app

Test de positionnement & intégration civique — SIDJI Formation.

- Frontend : `index.html`, `style.css`, `script.js` (déployé sur Vercel)
- Backend : `server.py` (Flask + MySQL, hébergé sur Alwaysdata)

## Configuration du backend

Les identifiants MySQL se règlent par variables d'environnement (voir `.env.example`), jamais dans le code.

L'URL de l'API utilisée par le site se règle dans `common.js` (`API_URL`).

## Espace formateur

`admin.html` (lien « Espace formateur » en bas du site) : liste des résultats, filtres,
statistiques, détail des réponses et export CSV (Excel). Accès protégé par le code
défini dans la variable d'environnement `ADMIN_CODE` du serveur.
