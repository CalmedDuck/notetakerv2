const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop/db/db.json'), 'utf8'));
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop/db/db.json'), 'utf8'));
    const newNote = req.body;
    newNote.id = Date.now().toString(); // Using timestamp as ID
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(notes), 'utf8');
    res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'Develop/db/db.json'), 'utf8'));
    const updatedNotes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync(path.join(__dirname, 'Develop/db/db.json'), JSON.stringify(updatedNotes), 'utf8');
    res.json({ ok: true });
});

module.exports = router;