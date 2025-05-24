const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const TokenBlacklistModel = require("../models/tokenBlackList");

//authentifie : je ss connecte
//autorisé : je ss autorisé
const verifyToken = async (req, res, next) => {
    try {
        //EXTRACT TOKEN FROM COOKIE
        const token = req.cookies.token;
        //console.log("Cookie", req.cookie, req.cookies);


        //CHECK IF TOKEN EXISTS
        if (!token) {
            return res.status(401).json({ message: "Authentication token is missing" }); //401 = pas la permission
        }

        const blacklistedToken = await TokenBlacklistModel.findOne({ token }); //Check if token is in the blacklist collection

        if (blacklistedToken) {  //Attention
            return res.status(403).json({ message: "Token is expired" });
        }
        //VERIFY TOKEN 
        const decoded = jwt.verify(token, process.env.SECRET); //Check the token infos to see if it contains the user's infos, compares with the secret

        //ATTACH USER DATA TO REQUEST OBJECT
        req.user = decoded.user;

        next(); //CONTINUES TO NEXT METHOD AFTER MIDDLEWARE BLOCKED THE REQUEST

    }
    catch (error) {
        console.error("JWT verification failed: ", error);
        return res.status(403).json({ message: "Token is invalid or expired" });

    }
}

module.exports = { verifyToken };