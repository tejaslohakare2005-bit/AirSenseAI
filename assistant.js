async function askAI() {
    const query = document.getElementById("query").value.trim();

    if (!query) return;

    document.getElementById("response").innerText = "⏳ Searching...";

    try {
        // 🔥 Step 1: Search Wikipedia properly
        const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

        const searchRes = await fetch(searchUrl);
        const searchData = await searchRes.json();

        if (!searchData.query.search.length) {
            document.getElementById("response").innerText =
                "❌ No results found. Try different question.";
            return;
        }

        // 🔥 Step 2: Get best match title
        const title = searchData.query.search[0].title;

        // 🔥 Step 3: Get summary
        const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
        const summaryRes = await fetch(summaryUrl);
        const summaryData = await summaryRes.json();

        if (summaryData.extract) {
            document.getElementById("response").innerText =
                `📖 ${title}\n\n${summaryData.extract}`;
        } else {
            document.getElementById("response").innerText =
                "⚠️ Could not fetch details.";
        }

    } catch (error) {
        document.getElementById("response").innerText =
            "⚠️ Error fetching data.";
        console.error(error);
    }
}