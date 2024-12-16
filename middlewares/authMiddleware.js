require('dotenv').config({ path: 'config.env' });

const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access Denied. No token provided' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = { authenticate };