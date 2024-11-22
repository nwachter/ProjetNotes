const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getAllItems, getItemById, createItem, deleteItem, updateItem } = require('../controllers/itemsController');



router.get('/', (req, res) => {
    // res.send('voilà la page ');
    let error = null;
    res.render('index', {
        error: error
    })
});

router.get('/', getAllItems);

router.get('/:id', getItemById);

router.post('/createItem', createItem);

router.delete('/deleteItem/:id', deleteItem);

router.put('/updateItem/:id', updateItem);



router.get('/note', async (req, res) => { //async pour que les données soient chargées
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    const APIKEY = process.env.OWM_APIKEY;
    let error = null;
    let meteo;
    let city = req.query.city;

    const meteoURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`

    try {
        const response = await axios.get(meteoURL);
        meteo = response.data;
        console.log(meteo);
        console.log(city);
    }
    catch (error) {
        meteo = null;
        console.log(error.message);
    }
    res.render('note', {
        meteo,
        city,
        error
    })
});

//moteur de ejs
module.exports = router;