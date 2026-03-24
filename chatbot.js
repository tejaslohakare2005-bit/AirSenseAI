function askBot() {
    const query = document.getElementById("userQuery").value.toLowerCase();
    const aqi = parseInt(document.getElementById("aqi").innerText);

    if (isNaN(aqi)) {
        document.getElementById("botResponse").innerText = "⚠️ Please fetch AQI first.";
        return;
    }

    let response = "";

    // 🏃 Outdoor questions
    if (query.includes("outside") || query.includes("go out") || query.includes("exercise")) {
        if (aqi <= 100) response = "🏃 Yes, it's safe for outdoor activities.";
        else response = "🚫 Not safe to go outside. Air quality is poor.";
    }

    // 🫁 Health questions
    else if (query.includes("health") || query.includes("asthma") || query.includes("breathing")) {
        if (aqi <= 100) response = "💚 Air is safe for most people.";
        else response = "😷 Wear a mask and limit exposure.";
    }

    // 🌾 Agriculture questions
    else if (query.includes("farm") || query.includes("crop") || query.includes("spray")) {
        if (aqi <= 100) response = "🌱 Safe for farming activities.";
        else response = "⚠️ Avoid spraying due to polluted air.";
    }

    // 🌫️ General AQI
    else if (query.includes("aqi") || query.includes("air quality")) {
        response = `🌍 Current AQI is ${aqi}, which is ${getRisk(aqi)}.`;
    }

    // ❓ Default fallback
    else {
        response = "🤖 I can help with air quality, health, outdoor, and farming advice.";
    }

    document.getElementById("botResponse").innerText = response;
}