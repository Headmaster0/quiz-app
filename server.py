import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    'host': 'mysql-test-positionnement-sidji-formation.alwaysdata.net',
    'user': '492059_admin_quiz',  # Ex: 492059_admin_quiz
    'password': 'Azerty&19200',
    'database': 'test-positionnement-sidji-formation_quiz_db',
    'port': 3306
}

@app.route('/api/sauvegarder', methods=['POST'])
def sauvegarder():
    data = request.json
    nom = data.get('nom')
    score = data.get('score')
    total = data.get('total')
    niveau = data.get('niveau')

    try:
        conn = mysql.connector.connect(**DB_CONFIG)
        cursor = conn.cursor()
        query = """
            INSERT INTO resultats_apprenants (nom_apprenant, score, total_questions, niveau_estime)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (nom, score, total, niveau))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'message': 'Succès'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)