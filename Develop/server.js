const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets/css', function(req, res, next) {
    res.setHeader('Content-Type', 'text/css');
    next();
  });
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
