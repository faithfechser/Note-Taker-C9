const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON data
app.use(express.json());
// Middleware for parsing urlencoded data
app.use(express.urlencoded({ extended: true }));
// Middleware for serving static files
app.use(express.static('public'));

// ...

// Route to the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to the notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});


// API route to get all notes
app.get('/api/notes', (req, res) => {
  const notes = getNotes();
  res.json(notes);
});

// API route to save a new note
app.post('/api/notes', (req, res) => {
  const { title, text } = req.body;
  const newNote = { title, text, id: generateId() };
  const notes = getNotes();
  notes.push(newNote);
  saveNotes(notes);
  res.json(newNote);
});

// API route to delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const notes = getNotes();
  const updatedNotes = notes.filter((note) => note.id !== id);
  saveNotes(updatedNotes);
  res.sendStatus(200);
});

// Helper function to read notes from the database
function getNotes() {
  const data = fs.readFileSync('db/db.json', 'utf8');
  return JSON.parse(data);
}

// Helper function to save notes to the database
function saveNotes(notes) {
  fs.writeFileSync('db/db.json', JSON.stringify(notes));
}


// Helper function to generate a unique ID for a note
function generateId() {
  return Date.now().toString();
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
