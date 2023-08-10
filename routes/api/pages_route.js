const router = require('express').Router();

// The `/api/pages` endpoint

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});