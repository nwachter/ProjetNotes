const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, verifyTokenAndGetUserInfo } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/verify', verifyTokenAndGetUserInfo);



module.exports = router;