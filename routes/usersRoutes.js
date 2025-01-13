const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/usersController');
const { verifyToken } = require('../middlewares/verifyToken');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.delete('/:id', verifyToken, isAdmin, deleteUser);

router.put('/:id', verifyToken, updateUser);

module.exports = router;