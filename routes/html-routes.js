// Dependencies
const router = require("express").Router();
const path = require("path");

// Routes for 'index.html' as a response to a client
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
//Routes for 'notes.html" as a response to a client
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;
