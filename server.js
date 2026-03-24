const express = require("express");
const cors = require("cors");

// fetch support
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());

// 🔑 YOUR API KEY (PUT HERE ONLY)
const API_KEY = "5fbfd9c7de15e337f1b29124c7bb1be285a689e3";

// 🌍 AQI ROUTE
app.get("/api/aqi", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.json({ error: "City is required" });
  }

  try {
    const url = `https://api.waqi.info/feed/${encodeURIComponent(city)}/?token=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log("WAQI RESPONSE:", data);

    if (data.status !== "ok") {
      return res.json({ error: "Invalid city or API issue" });
    }

    res.json({
      aqi: data.data.aqi,
      city: data.data.city.name,
      lat: data.data.city.geo[0],
      lon: data.data.city.geo[1]
    });

  } catch (error) {
    console.error(error);
    res.json({ error: "Server error" });
  }
});

// ✅ ROOT FIX (no more "Cannot GET /")
app.get("/", (req, res) => {
  res.send("✅ AirSense AI+ Backend Running");
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});