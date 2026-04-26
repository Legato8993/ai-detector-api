const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

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