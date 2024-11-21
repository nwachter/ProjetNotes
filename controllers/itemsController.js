const { readData, writeData } = require('../utils/fileHandler');

//Get All items
const getAllItems = (req, res) => {
    const data = readData();
    // res.json(data);

    res.render('index', {
        meteo,
        city,
        error
    })
}

//Get item by id
const getItemById = (req, res) => {
    const data = readData();
    const item = data.find((item) => item.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
}

//Create item
const createItem = (req, res) => {
    const data = readData();
    const newItem = {
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1, //Auto increment ID
        //Test si il y a des objets => incrémenter de 1 SINON ajouter id 1
        ...req.body

    };
    data.push(newItem);
    writeData(data);
    res.status(201).json(newItem);
}

//Delete Item
const deleteItem = (req, res) => {
    const data = readData();
    const updatedData = data.filter((item) => item.id !== parseInt(req.params.id));

    if (data.length === updatedData.length) {
        return res.status(404).json({ error: "Item not found" });
    }
    writeData(updatedData);

    console.log(`Item with ID ${req.params.id} deleted`);

    res.status(200).json({ message: `Item with ID ${req.params.id} deleted` });

}

const updateItem = (req, res) => {
    const data = readData();
    const itemIndex = data.findIndex((item) => item.id === parseInt(req.params.id));

    if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found" });
    }
    data[itemIndex] = {
        id: parseInt(req.params.id),
        ...req.body
    };
    writeData(data);
    res.json(data[itemIndex])
}

module.exports = { getAllItems, getItemById, createItem, deleteItem, updateItem };