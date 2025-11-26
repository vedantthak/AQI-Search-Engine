# AQI-Search-Engine
AQI Search Engine — Air Quality Index Finder
 A fast and modern web app to check real-time Air Quality Index (AQI) for any city using an elegant UI
 and a Flask backend with caching for speed.
 FEATURES:- Real-time AQI using AQICN API- Response caching for faster results- REST API structure- Clean frontend user interface- Error handling for invalid city names
 TECH STACK:
 Backend: Python, Flask, Flask-Caching, Requests, Dotenv
 Frontend: HTML, CSS, JavaScript (Fetch API)
 PROJECT STRUCTURE:
 aqi-search-engine/
 backend/
 app.py
 requirements.txt
 .env
 frontend/
 index.html
 styles.css
 app.js
 ENV SETUP:
 Create .env inside backend:
 AQI_TOKEN=YOUR_API_KEY
SETUP INSTRUCTIONS:
 1. cd C:\Users\Vedant\aqi-search-engine
 2. python -m venv venv
 3. venv\Scripts\activate
 4. cd backend
 5. pip install -r requirements.txt
 6. python app.py (Runs on http://127.0.0.1:5000)
 FRONTEND:
 1. Open second CMD
 2. cd C:\Users\Vedant\aqi-search-engine\frontend
 3. python -m http.server 8000 (Runs on http://127.0.0.1:8000)
 API ENDPOINT:
 GET http://127.0.0.1:5000/api/aqi?city=delhi
 AUTHOR:
 Vedant Thakare — Air Quality Index Search Engine (2025)
