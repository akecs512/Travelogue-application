const router = require('express').Router();
const path = require('path');

// The `/api/pages` endpoint

router.get("/", (req, res) => {
  res.render("login");
});

module.exports = router;