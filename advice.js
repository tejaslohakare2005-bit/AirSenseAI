function getAdvice() {
    const aqi = parseInt(document.getElementById("aqi").innerText);
    const mode = document.getElementById("mode").value;

    if (isNaN(aqi)) {
        alert("Please fetch AQI first");
        return;
    }

    let advice = "";

    if (mode === "normal") {
        if (aqi <= 50) advice = "🌿 Air is fresh and clean.";
        else if (aqi <= 100) advice = "🙂 Air quality acceptable.";
        else if (aqi <= 150) advice = "⚠️ Avoid long exposure.";
        else advice = "🚫 Poor air quality.";
    }

    if (mode === "outdoor") {
        if (aqi <= 50) advice = "🏃 Perfect for outdoor activities.";
        else if (aqi <= 100) advice = "🚶 Safe for light activities.";
        else if (aqi <= 150) advice = "⚠️ Avoid heavy exercise.";
        else advice = "🚫 Not safe outdoors.";
    }

    if (mode === "health") {
        if (aqi <= 50) advice = "💚 Safe for all.";
        else if (aqi <= 100) advice = "🙂 Sensitive groups be cautious.";
        else if (aqi <= 150) advice = "😷 Wear mask.";
        else advice = "🚨 Stay indoors.";
    }

    if (mode === "agriculture") {
        if (aqi <= 50) advice = "🌱 Ideal for farming.";
        else if (aqi <= 100) advice = "🌿 Safe.";
        else if (aqi <= 150) advice = "⚠️ Avoid spraying.";
        else advice = "🚫 Unsafe.";
    }

    document.getElementById("result").innerText = advice;
}