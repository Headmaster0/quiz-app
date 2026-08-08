import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# --- VÉRIFIE ET METS TES IDENTIFIANTS MYSQL ICI ---
db_config = {
    'host': 'mysql-test-positionnement-sidji-formation.alwaysdata.net',
    'user': '492059_admin_quiz',  # Ton identifiant MySQL Alwaysdata
    'password': 'Azerty&19200',   # Ton mot de passe MySQL Alwaysdata
    'database': 'test-positionnement-sidji-formation_quiz_db'
}

@app.route('/api/sauvegarder', methods=['POST'])
def sauvegarder():
    try:
        data = request.json or {}

        nom = data.get('nom')
        score = data.get('score')
        total = data.get('total')
        niveau = data.get('niveau')
        reponses = data.get('reponses')

        reponses_json = json.dumps(reponses, ensure_ascii=False) if reponses is not None else None

        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        query = """
            INSERT INTO resultats_apprenants (nom_apprenant, score, total_questions, niveau_estime, reponses)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(query, (nom, score, total, niveau, reponses_json))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'message': 'Succès'}), 200

    except Exception as e:
        print("Erreur SQL :", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/api/historique/<nom>', methods=['GET'])
def historique(nom):
    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT score, total_questions, niveau_estime, date_passage
            FROM resultats_apprenants
            WHERE nom_apprenant = %s
            ORDER BY date_passage DESC
            LIMIT 5
        """
        cursor.execute(query, (nom,))
        results = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(results), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()