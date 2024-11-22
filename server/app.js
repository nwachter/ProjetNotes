require('dotenv').config({ path: 'config.env' });
const path = require('path');
const http = require('http');

const hostname = 'localhost';
const PORT = 4001;

const router = require('./routes/routes');

const express = require('express');
const app = express();


app.use('/', router);
app.set('views', path.join(__dirname, 'views')); // Ensure this points to the correct folder

app.use(express.static('public'));
app.set("view engine", "ejs");


app.listen(PORT, hostname, () => {
    console.log(`Le serveur est démarré sur http://${hostname}:${PORT}`);
});




// const requestListener = (req, res) => {
//     //Si requete bien reçue, envoyer 200
//     res.writeHead(200);
//     res.end('Glass Notes app');
// }

// const server = http.createServer(requestListener);

