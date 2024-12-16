require('dotenv').config({ path: 'config.env' });
const { readUsers, writeUsers } = require('../utils/authHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Register Users
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: 'Username and password are required',
        })
    }

    const users = readUsers();

    //Check if user already exists
    if (users.some((user) => user.username === username)) {
        return res.status(409).json({
            message: 'User already exists',
        });
        // N'a pas pu être traité a cause d'un conflit avec l'état actuel de la ressource (valeur déjà existante)
    }

    //Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //Save the new user 
    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword
    }

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({
        message: "User registered successfully",
    })
};

// Login Users
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            error: 'Username and password are required',
        });
    }

    const users = readUsers();

    //Verify users by username
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.status(401).json({
            error: 'Invalid credentials',
        });
    }

    //Verify user password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({
            error: 'Invalid credentials',
        })
    }

    //Payload : ce qu'il y a dans la requête (username, password), le token sera lié a cet util durant cette session
    const token = jwt.sign({
        id: user.id,
        username: username,
    }, process.env.SECRET, {
        expiresIn: '2h',
    });
    res.json({ message: 'Login successful', token });
}


module.exports = { registerUser, loginUser };