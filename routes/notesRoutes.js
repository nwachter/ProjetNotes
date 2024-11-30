const express = require('express');
const router = express.Router();
const { getAllNotes, getNoteById, createNote, deleteNote, updateNote, getAllPostsController } = require('../controllers/notesController');
// router.get('/', (req, res) => {
//     // res.send('voilà la page ');
//     let error = null;
//     res.render('index', {
//         error: error
//     })
// });

router.get('/', getAllNotes);

router.get('/:id', getNoteById);

router.post('/', createNote);

router.delete('/:id', deleteNote);

router.put('/:id', updateNote);

router.get("/posts", getAllPostsController);
module.exports = router;



// router.get('/note', async (req, res) => { //async pour que les données soient chargées
//     // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//     const APIKEY = process.env.OWM_APIKEY;
//     let error = null;
//     let meteo;
//     let city = req.query.city;

//     const meteoURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`

//     try {
//         const response = await axios.get(meteoURL);
//         meteo = response.data;
//         console.log(meteo);
//         console.log(city);
//     }
//     catch (error) {
//         meteo = null;
//         console.log(error.message);
//     }
//     res.render('note', {
//         meteo,
//         city,
//         error
//     })
// });