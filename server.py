import hmac
import json
import os
from datetime import datetime, timedelta

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
MAX_REPONSES = 100
MAX_TEXTE_REPONSE = 1000

# Taille maximale d'une requete (evite qu'on envoie des megaoctets de texte)
app.config["MAX_CONTENT_LENGTH"] = 256 * 1024

# Seuls les modules proposes sur le site sont acceptes
MODULES_VALIDES = {
    "GRAMMAR", "READING", "CIVIC_SKILL", "CSP", "CR", "NAT",
    "A1", "A2", "B1", "B2", "ALL",
}
CARACTERES_INTERDITS_NOM = set("<>")


def est_entier(valeur):
    # En Python, True/False sont aussi des int : on les refuse explicitement
    return isinstance(valeur, int) and not isinstance(valeur, bool)


def reponses_valides(reponses):
    if reponses is None:
        return True
    if not isinstance(reponses, list) or len(reponses) > MAX_REPONSES:
        return False
    for item in reponses:
        if not isinstance(item, dict):
            return False
        for cle in ("question", "userAns", "correctAns"):
            val = item.get(cle)
            if val is not None and (not isinstance(val, str) or len(val) > MAX_TEXTE_REPONSE):
                return False
        for cle in ("isCorrect", "isSkipped"):
            val = item.get(cle)
            if val is not None and not isinstance(val, bool):
                return False
    return True

# Code d'acces a l'interface admin (admin.html) : variable d'environnement ADMIN_CODE
ADMIN_CODE = os.environ.get("ADMIN_CODE", "")


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
    if (not nom or len(nom) > MAX_NOM
            or any(c in CARACTERES_INTERDITS_NOM or ord(c) < 32 for c in nom)):
        return jsonify({"error": "Nom invalide"}), 400
    if niveau not in MODULES_VALIDES:
        return jsonify({"error": "Niveau invalide"}), 400
    if not est_entier(score) or not est_entier(total) or not (0 <= score <= total <= 100):
        return jsonify({"error": "Score invalide"}), 400
    if not reponses_valides(reponses):
        return jsonify({"error": "Réponses invalides"}), 400

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


# =====================================================================
# Interface d'administration (consultation des resultats)
# =====================================================================
def admin_autorise():
    """Verifie le code envoye dans l'en-tete Authorization: Bearer <code>."""
    if not ADMIN_CODE:
        return False
    entete = request.headers.get("Authorization", "")
    code = entete[7:] if entete.startswith("Bearer ") else ""
    return hmac.compare_digest(code.encode(), ADMIN_CODE.encode())


@app.route("/api/admin/verifier", methods=["GET"])
def admin_verifier():
    if not ADMIN_CODE:
        return jsonify({"error": "Interface admin non configurée (ADMIN_CODE manquant)"}), 503
    if not admin_autorise():
        return jsonify({"error": "Code d'accès incorrect"}), 401
    return jsonify({"ok": True}), 200


@app.route("/api/admin/resultats", methods=["GET"])
def admin_resultats():
    if not ADMIN_CODE:
        return jsonify({"error": "Interface admin non configurée (ADMIN_CODE manquant)"}), 503
    if not admin_autorise():
        return jsonify({"error": "Code d'accès incorrect"}), 401

    recherche = (request.args.get("q") or "").strip()[:MAX_NOM]
    module = (request.args.get("module") or "").strip()[:MAX_NIVEAU]
    try:
        jours = int(request.args.get("jours") or 0)
    except ValueError:
        jours = 0
    try:
        limite = max(1, min(int(request.args.get("limit") or 500), 2000))
    except ValueError:
        limite = 500

    conditions, params = [], []
    if recherche:
        conditions.append("LOWER(nom_apprenant) LIKE LOWER(%s)")
        params.append(f"%{recherche}%")
    if module:
        conditions.append("niveau_estime = %s")
        params.append(module)
    if jours > 0:
        conditions.append("date_passage >= %s")
        params.append(datetime.now() - timedelta(days=jours))
    where = ("WHERE " + " AND ".join(conditions)) if conditions else ""

    conn = None
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            f"""
            SELECT nom_apprenant, score, total_questions, niveau_estime, date_passage, reponses
            FROM resultats_apprenants
            {where}
            ORDER BY date_passage DESC
            LIMIT {limite}
            """,
            tuple(params),
        )
        lignes = cursor.fetchall()
        cursor.close()

        resultats = []
        for r in lignes:
            reponses = r.get("reponses")
            if isinstance(reponses, (bytes, bytearray)):
                reponses = reponses.decode("utf-8", "replace")
            if isinstance(reponses, str):
                try:
                    reponses = json.loads(reponses)
                except ValueError:
                    reponses = None
            date = r.get("date_passage")
            resultats.append({
                "nom": r.get("nom_apprenant"),
                "score": r.get("score"),
                "total": r.get("total_questions"),
                "module": r.get("niveau_estime"),
                "date": date.isoformat() if hasattr(date, "isoformat") else date,
                "reponses": reponses if isinstance(reponses, list) else [],
            })
        return jsonify({"resultats": resultats}), 200
    except Exception as e:
        app.logger.error("Erreur SQL (admin_resultats) : %s", e)
        return jsonify({"error": "Erreur serveur : impossible de lire les résultats"}), 500
    finally:
        if conn is not None and conn.is_connected():
            conn.close()


if __name__ == "__main__":
    app.run(debug=os.environ.get("FLASK_DEBUG") == "1")
