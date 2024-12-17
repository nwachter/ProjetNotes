require('dotenv').config({ path: '.env' });
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');

const hostname = 'localhost';
const PORT = Number(process.env.PORT || 4000);

const app = express();
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

//Cors
app.use(cors());



//Routes
const authRouter = require('./routes/authRoutes');
const usersRouter = require('./routes/usersRoutes');
const notesRouter = require('./routes/notesRoutes');
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/notes', notesRouter);

// Serve React static files
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// app.use(express.static('public'));


app.listen(PORT, hostname, () => {
    console.log(`Le serveur est démarré sur http://${hostname}:${PORT}`);
});
