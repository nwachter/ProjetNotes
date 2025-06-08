require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User");
const TokenBlacklistModel = require("../models/tokenBlackList");


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
            password: hashedPassword,
            roles: ["user"]
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
    //console.log("Login req.body : ", req.body)
    try {
        if (!username || !password) {
            return res.status(400).json({
                error: 'Username and password are required',
            });
        }

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
                expiresIn: '6h',
            }
        );
        const cookieOptions = {
            httpOnly: true, //Prevent access from client-side scripts
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax", //To Prevent CSRF attacks : strict
            maxAge: 5 * 24 * 60 * 60, // Expiration in milliseconds
            path: "/",
            // ...(process.env.NODE_ENV === "production" && {
            //   domain: "glass-notes.nwproject.fr",
            // }),
        };

        //SET TOKEN IN HTTP-ONLY COOKIE
        res.cookie("token", token, cookieOptions);

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

const logoutUser = async (req, res) => {
    try {
        //EXTRACT TOKEN FROM COOKIE
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "No token provided" }); //401 = pas la permission
        }

        //DECODE TOKEN TO GET EXPIRA
        const decoded = jwt.decode(token);
        const expiresAt = new Date(decoded.exp) * 1000; // Convert expiration date to milliseconds

        // ADD TOKEN TO BLACKLIST
        await TokenBlacklistModel.create({ token, expiresAt });

        //CLEAR COOKIE ON THE CLIENT SIDE
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",

        });

        res.status(200).json({
            message: "Logout successful",
        })

    }
    catch (error) {
        console.log("Logout error :", error);
        res.status(500).json({
            error: "Error during logout"
        })

    }

}

const verifyTokenAndGetUserInfo = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const blacklistedToken = await TokenBlacklistModel.findOne({ token }); //Check if token is in the blacklist collection

        if (blacklistedToken) {  //Attention
            return res.status(403).json({ message: "Token is expired" });
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        res.json({ user: decoded });
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
}



module.exports = { registerUser, loginUser, logoutUser, verifyTokenAndGetUserInfo };