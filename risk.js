function getRisk(aqi) {
    if (aqi <= 50) return "Low 🟢";
    if (aqi <= 100) return "Moderate 🟡";
    if (aqi <= 150) return "High 🟠";
    return "Danger 🔴";
}