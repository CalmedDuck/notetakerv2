const fs = require('fs');
const path = require('path');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();


const readDbFile = () => {
    const data = fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf-8');
    return JSON.parse(data);
};


const writeDbFile = (data) => {
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(data));
};

router.get('/notes', (req, res) => {
    const notes = readDbFile();
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const notes = readDbFile();
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };

    notes.push(newNote);
    writeDbFile(notes);

    res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
    const notes = readDbFile();
    const filteredNotes = notes.filter(note => note.id !== req.params.id);

    writeDbFile(filteredNotes);

    res.json(filteredNotes);
});

module.exports = router;
