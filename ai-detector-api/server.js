const express = require("express");
const natural = require("natural");

const app = express();
app.use(express.json());

function detectAI(text) {
    const tokenizer = new natural.WordTokenizer();
    const words = tokenizer.tokenize(text);

    const uniqueWords = new Set(words);

    const diversity = uniqueWords.size / words.length;

    if (diversity < 0.4) {
        return { result: "Likely AI-generated" };
    } else {
        return { result: "Likely Human-written" };
    }
}

app.post("/detect", (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "No text provided" });
    }

    const result = detectAI(text);
    res.json(result);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
