const resultEl = document.getElementById("result");
const searchBtn = document.getElementById("searchBtn");
const inputEl = document.getElementById("cityInput");

function showLoading() {
  resultEl.innerHTML = "<div class='aqi-box'>Loading...</div>";
}
function showError(msg) {
  resultEl.innerHTML = `<div class='aqi-box' style="color:#ffb4b4"><b>Error:</b> ${msg}</div>`;
}
function showResult(j) {
  resultEl.innerHTML = `
    <div class='aqi-box'>
      <h2>${j.city}</h2>
      <p><b>AQI:</b> ${j.aqi}</p>
      <p><b>Dominant pollutant:</b> ${j.dominant_pollutant || 'N/A'}</p>
      <pre style='white-space:pre-wrap'>${JSON.stringify(j.pollutants, null, 2)}</pre>
      <p style='color:cyan'>Cached: ${j.cached}</p>
      <p style='font-size:12px;color:#9aa;'>Time: ${j.time || 'N/A'}</p>
    </div>
  `;
}

async function searchAQI() {
  const city = inputEl.value.trim();
  if (!city) { alert("Enter a city"); return; }

  showLoading();

  try {
    const url = `http://127.0.0.1:5000/api/aqi?city=${encodeURIComponent(city)}`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      let errorText = `HTTP ${res.status}`;
      try {
        const ejson = await res.json();
        if (ejson && ejson.error) errorText += ` — ${ejson.error}`;
      } catch (e) { /* ignore parse error */ }
      throw new Error(errorText);
    }
    const j = await res.json();
    if (j.error) {
      showError(j.error);
    } else {
      showResult(j);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    showError(err.message || "Request failed");
  }
}

searchBtn.addEventListener("click", searchAQI);

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") searchAQI();
});
