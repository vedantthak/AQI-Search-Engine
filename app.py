import os
import requests
from flask import Flask, request, jsonify
from flask_caching import Cache
from dotenv import load_dotenv
from flask_cors import CORS


load_dotenv()  

app = Flask(__name__)
CORS(app)   


app.config["CACHE_TYPE"] = "SimpleCache"
app.config["CACHE_DEFAULT_TIMEOUT"] = 300
cache = Cache(app)

AQI_TOKEN = os.getenv("AQI_TOKEN")

API_URL = "https://api.waqi.info/feed/{city}/?token={token}"

def normalize_city(city):
    return city.strip().lower()

@app.route("/api/aqi")
def get_aqi():
    city = request.args.get("city", "").strip()

    if not city:
        return jsonify({"error": "city is required"}), 400

    cache_key = f"aqi:{normalize_city(city)}"

    cached_data = cache.get(cache_key)
    if cached_data:
        cached_data["cached"] = True
        return cached_data, 200

    url = API_URL.format(city=city, token=AQI_TOKEN)

    try:
        resp = requests.get(url, timeout=8).json()
    except Exception:
        return jsonify({"error": "API request failed"}), 503

    if resp.get("status") != "ok":
        return jsonify({"error": "City not found"}), 404

    data = resp["data"]

    result = {
        "city": data["city"]["name"],
        "aqi": data["aqi"],
        "dominant_pollutant": data.get("dominentpol", None),
        "pollutants": {k: v["v"] for k, v in data.get("iaqi", {}).items()},
        "time": data["time"]["s"],
        "cached": False
    }

    cache.set(cache_key, result)

    return jsonify(result), 200

@app.route("/")
def home():
    return jsonify({"message": "AQI Search API running"}), 200

if __name__ == "__main__":
    app.run(debug=True)
