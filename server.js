const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Detector API is running");
});

app.post("/detect", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.json({ result: "No text provided" });
  }

  const words = text.split(" ");
  const uniqueWords = new Set(words);
  const diversity = uniqueWords.size / words.length;

  if (diversity < 0.4) {
    res.json({ result: "Likely AI-generated" });
  } else {
    res.json({ result: "Likely Human-written" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});