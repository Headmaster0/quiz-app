import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

DB_CONFIG = {
    'host': 'mysql-test-positionnement-sidji-formation.alwaysdata.net',
    'user': '492059_admin_quiz',
    'password': 'Azerty&19200',
    'database': 'test-positionnement-sidji-formation_quiz_db',
    'port': 3306
}

@app.route('/api/sauvegarder', methods=['POST'])
def sauvegarder():
    data = request.json or {}
    
    # --- LOGS DE DEBUGGING (Consulte les logs Render après un test) ---
    print("=== DONNÉES BRUTES REÇUES DU FRONTEND ===")
    print("JSON complet reçu :", data)
    print("Contenu de la clé 'reponses' :", data.get('reponses'))
    print("=========================================")

    nom = data.get('nom')
    score = data.get('score')
    total = data.get('total')
    niveau = data.get('niveau')
    reponses = data.get('reponses')

    # Convertit en JSON uniquement si 'reponses' n'est pas None
    reponses_json = json.dumps(reponses, ensure_ascii=False) if reponses is not None else None

    try:
        conn = mysql.connector.connect(**DB_CONFIG)
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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)