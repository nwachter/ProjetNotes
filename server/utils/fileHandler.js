const fs = require('fs');
const path = require('path');


// READ DATA FROM THE JSON FILE
const readData = (fileName) => {
    const DATA_FILE = path.join(__dirname, `../data/${fileName}.json`);
    //comme lire un fchier prend du temps, utiliser try catch
    //soit async await, soit readFileSync
    try {
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(data);

    }
    catch (error) {
        console.error(`Error reading JSON file: ${error}`);
        return [];
    }
}

//WRITE DATA IN THE JSON FILE
const writeData = (data, fileName) => {
    const DATA_FILE = path.join(__dirname, `../data/${fileName}.json`);
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2)); //data, replacer, spaces
    }
    catch (error) {
        console.error(`Error writing JSON file: ${error}`);
    }
}

module.exports = { readData, writeData };