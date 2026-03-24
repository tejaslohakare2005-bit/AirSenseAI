// Tabs
function openTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}

// Map
let map = L.map('map').setView([22.5937, 78.9629], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

// AQI Fetch
async function getAQI() {
  const city = document.getElementById("city").value;

  if (!city) {
    alert("Enter city");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/aqi?city=${city}`);
    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    const aqi = data.aqi;

    document.getElementById("aqi").innerText = aqi;
    document.getElementById("risk").innerText = getRisk(aqi);

    // Map update
    map.flyTo([data.lat, data.lon], 10);

    if (marker) map.removeLayer(marker);

    marker = L.marker([data.lat, data.lon]).addTo(map)
      .bindPopup(`${city} AQI: ${aqi}`)
      .openPopup();

    updateAdvice(aqi);

  } catch (err) {
    alert("Server error");
  }
}

// Risk
function getRisk(aqi) {
  if (aqi <= 50) return "Low 🟢";
  if (aqi <= 100) return "Moderate 🟡";
  if (aqi <= 150) return "High 🟠";
  return "Danger 🔴";
}

// Advice Logic
function updateAdvice(aqi) {

  document.getElementById("advice").innerText =
    aqi <= 100 ? "Air is safe" : "Avoid exposure";

  document.getElementById("outdoorAdvice").innerText =
    aqi <= 100 ? "Safe for outdoor" : "Avoid outdoor";

  document.getElementById("healthAdvice").innerText =
    aqi <= 100 ? "Healthy air" : "Wear mask";

  if (aqi <= 50)
    document.getElementById("agricultureAdvice").innerText = "Ideal farming";
  else if (aqi <= 100)
    document.getElementById("agricultureAdvice").innerText = "Moderate farming";
  else
    document.getElementById("agricultureAdvice").innerText = "Avoid farming";
}