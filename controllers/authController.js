require('dotenv').config({ path: 'config.env' });
const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");


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
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({
            error: 'Username, email and password are required',
        });
    }

    try {
        // const client = new MongoClient(MONGODB_URI);
        // await client.connect();

        // const database = client.db('ProjetNotes');
        // const usersCollection = database.collection('users');


        // const existingUser = await usersCollection.findOne({ email });
        // if (existingUser) {
        //     return res.status(409).json({
        //         message: 'User email already exists in the database',
        //     });
        // }

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                error: "User email already exists in the database"
            })
        }


        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        });

        // await usersCollection.insertOne(newUser);
        const userData = await newUser.save();

        res.status(201).json({
            message: "User registered successfully", userData
        });
    } catch (error) {
        console.log("Registration Error:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
};


const loginUser = async (req, res) => {
    const MONGODB_URI = process.env.MONGODB_URI;
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({
                error: 'Username and password are required',
            });
        }


        // const client = new MongoClient(MONGODB_URI);
        // await client.connect();

        // const database = client.db('ProjetNotes');
        // const usersCollection = database.collection('users');

        // const user = await usersCollection.findOne({ username });
        // if (!user) {
        //     return res.status(401).json({
        //         error: 'Invalid credentials',
        //     });
        // }

        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(404).json({
                error: "Username not found"
            })
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
                email: user.email,
                roles: user.roles
            },
            process.env.SECRET,
            {
                expiresIn: '2h',
            }
        );

        //SET TOKEN IN HTTP-ONLY COOKIE
        res.cookie("token", token, {
            maxAge: 3600000, // Expiration in milliseconds
            httpOnly: true, //Prevent access from client-side scripts
            secure: process.env.NODE_ENV === 'prod', //Use HTTPS in production
            sameSite: "strict" //Prevent CSRF attacks
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles
            }
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to log in. Error : ${error.message}` });
    }
};



module.exports = { registerUser, loginUser };