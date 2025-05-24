require('dotenv').config({ path: '.env' });
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { importUsers, importNotes } = require('./controllers/notesController');
const { usersData } = require('./data/users');
const { notesData } = require('./data/notes');

// const hostname = 'localhost';
// const hostname = '127.0.0.1'; 
const URI = process.env.MONGODB_URI;
const PORT = Number(process.env.PORT || 4000);

const app = express();
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

//Cors
// app.use(cors());
// app.use(cors({
//     origin: 'http://127.0.0.1:3000', 
//     credentials: true
// }));
// CORS pour production
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://glass-notes-ten.vercel.app/',
    'https://glass-notes-git-main-nwachters-projects.vercel.app/',
    'https://glass-notes-rfyd6fm20-nwachters-projects.vercel.app/'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

//cookie parser
app.use(cookieParser());

mongoose.connect(URI).then(() => {
    console.log("La connexion MongoDB est établie")
}).catch((error) => {
    console.log(error)
});


//Routes
const authRouter = require('./routes/authRoutes');
const usersRouter = require('./routes/usersRoutes');
const notesRouter = require('./routes/notesRoutes');
const tagsRouter = require('./routes/tagsRoutes');
// const { updateNoteTags } = require('./controllers/tagsController');
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/notes', notesRouter);
app.use('/api/v1/tags', tagsRouter);

// Serve React static files
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/client/sw.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'sw.js'));
}); //testerror

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});



// app.use(express.static('public'));


app.listen(PORT, hostname, () => {
    // console.log(`Le serveur est démarré sur http://${hostname}:${PORT}`);
    console.log(`Le serveur est démarré sur le port ${PORT}`);

});
