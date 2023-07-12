// Import Modules
const express = require('express');
const path = require('path');
const fs = require('fs');
// Express Application
const app = express();
// PORT
const PORT = process.env.PORT || 3000;
// Parsing for:
// Json data
app.use(express.json());
// urlended data
app.use(express.urlencoded({ extended: true }));
// Static files
app.use(express.static('public'));


// Routing
// Homepage route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  // Notes page route
  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
  });
  
  // API Route, get notes
  app.get('/api/notes', (req, res) => {
    const notes = getNotes();
    res.json(notes);
  });
  
  // API route, new notes
  app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const newNote = { title, text, id: generateId() };
    const notes = getNotes();
    notes.push(newNote);
    saveNotes(notes);
    res.json(newNote);
  });
  
  // API route, note deletion
  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    const notes = getNotes();
    const updatedNotes = notes.filter((note) => note.id !== id);
    saveNotes(updatedNotes);
    res.sendStatus(200);
  });

// Note reader function
  function getNotes() {
    const data = fs.readFileSync('db/db.json', 'utf8');
    return JSON.parse(data);
  }
  
  // Note Saving Function
  function saveNotes(notes) {
    fs.writeFileSync('db/db.json', JSON.stringify(notes));
  }
  
  // ID Gen Function
  function generateId() {
    return Date.now().toString();
  }

// Server Start
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });