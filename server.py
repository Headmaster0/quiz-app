import json
import os

from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)

# --- CORS : seul le site Vercel (et le local pour les tests) peut appeler l'API ---
ALLOWED_ORIGINS = os.environ.get(
    "ALLOWED_ORIGINS",
    "https://quiz-app-beta-mauve.vercel.app,http://localhost:5500,http://127.0.0.1:5500",
).split(",")
CORS(app, origins=[o.strip() for o in ALLOWED_ORIGINS if o.strip()])

# --- Identifiants MySQL : JAMAIS dans le code, toujours en variables d'environnement ---
# A definir dans le panneau Alwaysdata (Environnement > Variables) ou dans un fichier .env non versionne.
db_config = {
    "host": os.environ.get("DB_HOST"),
    "user": os.environ.get("DB_USER"),
    "password": os.environ.get("DB_PASSWORD"),
    "database": os.environ.get("DB_NAME"),
}

MAX_NOM = 100
MAX_NIVEAU = 50


def get_connection():
    missing = [k for k, v in db_config.items() if not v]
    if missing:
        raise RuntimeError(f"Variables d'environnement manquantes : {', '.join(missing)}")
    return mysql.connector.connect(**db_config)


@app.route("/api/health", methods=["GET"])
def health():
    """Permet de verifier rapidement que l'API repond (ouvrir l'URL dans le navigateur)."""
    return jsonify({"status": "ok"}), 200


@app.route("/api/sauvegarder", methods=["POST"])
def sauvegarder():
    data = request.get_json(silent=True) or {}

    nom = str(data.get("nom") or "").strip()
    niveau = str(data.get("niveau") or "").strip()
    score = data.get("score")
    total = data.get("total")
    reponses = data.get("reponses")

    # Validation minimale des donnees recues
    if not nom or len(nom) > MAX_NOM:
        return jsonify({"error": "Nom invalide"}), 400
    if not niveau or len(niveau) > MAX_NIVEAU:
        return jsonify({"error": "Niveau invalide"}), 400
    if not isinstance(score, int) or not isinstance(total, int) or not (0 <= score <= total <= 100):
        return jsonify({"error": "Score invalide"}), 400

    reponses_json = json.dumps(reponses, ensure_ascii=False) if reponses is not None else None

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor()
        query = """
            INSERT INTO resultats_apprenants (nom_apprenant, score, total_questions, niveau_estime, reponses)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(query, (nom, score, total, niveau, reponses_json))
        conn.commit()
        cursor.close()
        return jsonify({"message": "Succès"}), 200
    except Exception as e:
        # On log le detail cote serveur, mais on ne l'envoie pas au navigateur
        app.logger.error("Erreur SQL (sauvegarder) : %s", e)
        return jsonify({"error": "Erreur serveur lors de l'enregistrement"}), 500
    finally:
        if conn is not None and conn.is_connected():
            conn.close()


@app.route("/api/historique/<nom>", methods=["GET"])
def historique(nom):
    nom = (nom or "").strip()
    if not nom or len(nom) > MAX_NOM:
        return jsonify([]), 200

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
            SELECT score, total_questions, niveau_estime, date_passage
            FROM resultats_apprenants
            WHERE LOWER(nom_apprenant) = LOWER(%s)
            ORDER BY date_passage DESC
            LIMIT 5
        """
        cursor.execute(query, (nom,))
        results = cursor.fetchall()
        cursor.close()
        # date_passage -> texte ISO pour que le JS la lise correctement
        for r in results:
            if r.get("date_passage") is not None:
                r["date_passage"] = r["date_passage"].isoformat()
        return jsonify(results), 200
    except Exception as e:
        app.logger.error("Erreur SQL (historique) : %s", e)
        return jsonify({"error": "Erreur serveur lors de la lecture de l'historique"}), 500
    finally:
        if conn is not None and conn.is_connected():
            conn.close()


if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG") == "1")
