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

//kkk

//Cors - If the backend API and React frontend run on different ports during development.
// CORS setup
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));
// app.use(cors());

//Routes
const notesRouter = require('./routes/notesRoutes');
app.use('/api/v1/notes', notesRouter);

// Serve React static files
// app.use(express.static(path.join(__dirname, 'client/build')));
// app.get('*', (req, res) => {
//     // Serves the React build from Express ; When users visit non-API routes, the server will send the React app's index.html.
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


// app.use(express.static('public'));


app.listen(PORT, hostname, () => {
    console.log(`Le serveur est démarré sur http://${hostname}:${PORT}`);
});


