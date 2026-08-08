const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

// Configuration de la connexion BDD (MySQL)
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'quiz_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Route POST : Sauvegarde d'un résultat
app.post('/api/sauvegarder', async (req, res) => {
  try {
    const { nom, score, total, niveau, reponses } = req.body;
    const reponsesJson = JSON.stringify(reponses || []);

    const query = `
      INSERT INTO resultats (nom_apprenant, score, total_questions, niveau_estime, date_passage, reponses)
      VALUES (?, ?, ?, ?, NOW(), ?)
    `;

    await db.query(query, [nom, score, total, niveau, reponsesJson]);
    res.status(200).json({ success: true, message: 'Résultat enregistré avec succès.' });
  } catch (err) {
    console.error('Erreur sauvegarde BDD :', err);
    res.status(500).json({ error: err.message });
  }
});

// Route GET : Récupération de l'historique d'un utilisateur
app.get('/api/historique/:nom', async (req, res) => {
  try {
    const { nom } = req.params;
    const query = `
      SELECT score, total_questions, niveau_estime, date_passage 
      FROM resultats 
      WHERE LOWER(nom_apprenant) = LOWER(?) 
      ORDER BY date_passage DESC
    `;
    const [rows] = await db.query(query, [nom]);
    res.json(rows);
  } catch (err) {
    console.error('Erreur récupération historique :', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});