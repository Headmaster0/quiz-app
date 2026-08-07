import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# ============================================================
# CONFIGURATION BASE DE DONNÉES
# ============================================================

DB_CONFIG = {
    'host': os.environ.get(
        'DB_HOST',
        'mysql-test-positionnement-sidji-formation.alwaysdata.net'
    ),
    'user': os.environ.get('492059_admin_quiz'),
    'password': os.environ.get('Azerty&19200'),
    'database': os.environ.get(
        'DB_NAME',
        'test-positionnement-sidji-formation_quiz_db'
    ),
    'port': int(os.environ.get('DB_PORT', 3306))
}


# ============================================================
# FONCTION DE CONNEXION BDD
# ============================================================

def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)


# ============================================================
# ROUTE TEST
# ============================================================

@app.route('/', methods=['GET'])
def accueil():
    return jsonify({
        'success': True,
        'message': 'API Test de Positionnement SIDJI Formation opérationnelle.'
    })


# ============================================================
# SAUVEGARDE D'UN RÉSULTAT
# ============================================================

@app.route('/api/sauvegarder', methods=['POST'])
def sauvegarder():

    data = request.json or {}

    print("=========================================")
    print("DONNÉES REÇUES DU FRONTEND")
    print(data)
    print("=========================================")

    nom = data.get('nom')
    score = data.get('score')
    total = data.get('total')
    niveau = data.get('niveau')
    reponses = data.get('reponses')

    # Vérification minimale
    if not nom:
        return jsonify({
            'success': False,
            'error': 'Le nom de l’apprenant est obligatoire.'
        }), 400

    if score is None:
        return jsonify({
            'success': False,
            'error': 'Le score est obligatoire.'
        }), 400

    if total is None:
        return jsonify({
            'success': False,
            'error': 'Le nombre total de questions est obligatoire.'
        }), 400

    # Conversion des réponses en JSON
    reponses_json = (
        json.dumps(reponses, ensure_ascii=False)
        if reponses is not None
        else None
    )

    conn = None
    cursor = None

    try:

        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
            INSERT INTO resultats_apprenants
            (
                nom_apprenant,
                score,
                total_questions,
                niveau_estime,
                reponses
            )
            VALUES (%s, %s, %s, %s, %s)
        """

        cursor.execute(
            query,
            (
                nom,
                score,
                total,
                niveau,
                reponses_json
            )
        )

        conn.commit()

        print("✅ Résultat enregistré dans la BDD.")

        return jsonify({
            'success': True,
            'message': 'Succès'
        }), 200

    except Exception as e:

        print("❌ ERREUR SQL SAUVEGARDE :", str(e))

        if conn:
            conn.rollback()

        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# ============================================================
# RÉCUPÉRATION DE L'HISTORIQUE D'UN UTILISATEUR
# ============================================================

@app.route('/api/historique/<path:nom>', methods=['GET'])
def historique(nom):

    print("=========================================")
    print("DEMANDE HISTORIQUE")
    print("Nom recherché :", nom)
    print("=========================================")

    conn = None
    cursor = None

    try:

        conn = get_db_connection()

        cursor = conn.cursor(dictionary=True)

        query = """
            SELECT
                score,
                total_questions,
                niveau_estime,
                date_passage
            FROM resultats_apprenants
            WHERE LOWER(TRIM(nom_apprenant)) = LOWER(TRIM(%s))
            ORDER BY date_passage DESC
            LIMIT 20
        """

        cursor.execute(query, (nom,))

        rows = cursor.fetchall()

        print("Nombre de résultats trouvés :", len(rows))
        print("Historique :", rows)

        return jsonify(rows), 200

    except Exception as e:

        print("❌ ERREUR SQL HISTORIQUE :", str(e))

        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if conn:
            conn.close()


# ============================================================
# LANCEMENT DU SERVEUR
# ============================================================

if __name__ == '__main__':

    port = int(os.environ.get('PORT', 5000))

    app.run(
        host='0.0.0.0',
        port=port
    )