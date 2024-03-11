const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

// Variables to return response in form of promise object instead of using callback function
const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

class Save {
  write(note) {
    return writeNote("db/db.json", JSON.stringify(note));
  }

  read() {
    return readNote("db/db.json", "utf8");
  }

  async postNotes() {
    const notes = await this.read();
    let parsedNotes;
    try {
      parsedNotes = [].concat(JSON.parse(notes));
    } catch (err) {
      parsedNotes = [];
    }
    return parsedNotes;
  }

  async getNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Both title and text can not be blank");
    }

    //Use UUID package to add unique IDs
    const newNote = { title, text, id: uuidv4() };

    // Retrieve, add, and update notes
    const notes = await this.postNotes();
    const updatedNotes = [...notes, newNote];
    await this.write(updatedNotes);
    return newNote;
  }

  async deleteNote(id) {
    const notes = await this.postNotes();
    const filteredNotes = notes.filter((note) => note.id !== id);
    return await this.write(filteredNotes);
  }
}

module.exports = new Save();
