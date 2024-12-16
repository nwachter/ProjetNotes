const fs = require('fs');
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');

console.log("Path to users JSON file: ", USERS_FILE);

const readUsers = () => {
    try {
        const data = fs.readFileSync(USERS_FILE, "utf-8");
        return JSON.parse(data);

    } catch (error) {
        console.error('Error reading JSON file: ', error);
        return [];

    }
}

const writeUsers = (data) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
    }
    catch (error) {
        console.error('Error reading JSON file: ', error);

    }
}

module.exports = { readUsers, writeUsers };