const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

// GET request to retrieve all notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST request to add a new note
notes.post("/", (req, res) => {
  const { title, text } = req.body;
  if (title && text) {
    const newNote = { title, text, id: uuidv4() };

    readAndAppend(newNote, "./db/db.json")
      .then(() => res.json(newNote))
      .catch((err) => res.status(500).json(err));
  } else {
    res.status(400).json({ message: "Title and text are required." });
  }
});

// DELETE request to delete a note by ID
notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((notes) => notes.filter((note) => note.id !== noteId))
    .then((filteredNotes) => writeToFile("./db/db.json", filteredNotes))
    .then(() => res.json({ message: "Note deleted successfully" }))
    .catch((err) => res.status(500).json(err));
});

module.exports = notes;
