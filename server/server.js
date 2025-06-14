require('dotenv').config({ path: '.env' });
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const { importUsers, importNotes } = require('./controllers/notesController');
const { usersData } = require('./data/users');
const { notesData } = require('./data/notes');

// const hostname = '127.0.0.1'; 
const URI = process.env.MONGODB_URI;
const PORT = Number(process.env.PORT || 4000);
const NODE_ENV = process.env.NODE_ENV || 'production';

const hostname = NODE_ENV === 'development' ? 'localhost' : '0.0.0.0';


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
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://notes_client:3001',
    'http://projetnotes-notes_client-1:3001',
    "https://glass-notes.nwproject.fr/",
    'https://glass-notes-git-main-nwachters-projects.vercel.app',
    'https://glass-notes-16mkl2nxz-nwachters-projects.vercel.app'
];

// app.use((req, res, next) => {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader('Access-Control-Allow-Origin', origin);
//         res.setHeader('Access-Control-Allow-Credentials', 'true');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//         res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     }

//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200);
//     }

//     next();
// });

app.use(cors({
    origin: [
        'http://localhost:3001',
        'http://localhost:3000',
        'http://localhost:4000',
        'https://localhost:4000',
        'https://glass-notes.nwproject.fr',
        'https://glass-notes.nwproject.fr/',
        'http://notes_client:3001'  // For internal container communication
    ],
    credentials: true
}));

// Gérer les requêtes OPTIONS (preflight)
// app.options('*', cors());

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

// Serve React static files //testerror removed this for deployment, file serving handled by cadddy
// app.use(express.static(path.join(__dirname, '../client/build')));


// app.get('/client/sw.js', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'sw.js'));
// });

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });



// app.use(express.static('public'));


app.listen(PORT, hostname, () => {
    console.log(`Le serveur est démarré sur ${NODE_ENV === "production" ? "https://" : "http://"}${hostname}:${PORT}`);
    // console.log(`Le serveur est démarré sur le port ${PORT}`);

});
