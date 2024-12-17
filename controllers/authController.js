require('dotenv').config({ path: 'config.env' });
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Register Users
// const registerUser = async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({
//             error: 'Username and password are required',
//         })
//     }

//     const users = readUsers();

//     //Check if user already exists
//     if (users.some((user) => user.username === username)) {
//         return res.status(409).json({
//             message: 'User already exists',
//         });
//         // N'a pas pu être traité a cause d'un conflit avec l'état actuel de la ressource (valeur déjà existante)
//     }

//     //Hash password
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     //Save the new user 
//     const newUser = {
//         id: users.length + 1,
//         username,
//         password: hashedPassword
//     }

//     users.push(newUser);
//     writeUsers(users);

//     res.status(201).json({
//         message: "User registered successfully",
//     })
// };


const registerUser = async (req, res) => {
    const MONGODB_URI = process.env.MONGODB_URI;
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: 'Username and password are required',
        });
    }

    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();

        const database = client.db('ProjetNotes');
        const usersCollection = database.collection('users');

        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists',
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            username,
            password: hashedPassword
        };

        await usersCollection.insertOne(newUser);

        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
};



// Login Users
// const loginUser = async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//         return res.status(400).json({
//             error: 'Username and password are required',
//         });
//     }

//     const users = readUsers();

//     //Verify users by username
//     const user = users.find((user) => user.username === username);
//     if (!user) {
//         return res.status(401).json({
//             error: 'Invalid credentials',
//         });
//     }

//     //Verify user password
//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//         return res.status(401).json({
//             error: 'Invalid credentials',
//         })
//     }

//     //Payload : ce qu'il y a dans la requête (username, password), le token sera lié a cet util durant cette session
//     const token = jwt.sign({
//         id: user.id,
//         username: username,
//     }, process.env.SECRET, {
//         expiresIn: '2h',
//     });
//     res.json({ message: 'Login successful', token });
// }

const loginUser = async (req, res) => {
    const MONGODB_URI = process.env.MONGODB_URI;
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            error: 'Username and password are required',
        });
    }

    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();

        const database = client.db('ProjetNotes');
        const usersCollection = database.collection('users');

        const user = await usersCollection.findOne({ username });
        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials',
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                error: 'Invalid credentials',
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
            },
            process.env.SECRET,
            {
                expiresIn: '2h',
            }
        );

        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: `Failed to log in. Error : ${error.message}` });
    }
};



module.exports = { registerUser, loginUser };