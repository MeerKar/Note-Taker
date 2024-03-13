// Dependencies
const router = require("express").Router();
const path = require("path");

// Defines the route that sends 'index.html' as a response to a client when a GET request is made
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
// Defines the route that sends 'notes.html" as a response to a client when a GET request is made
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;
