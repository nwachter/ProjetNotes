const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/usersController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.delete('/:id', authenticate, deleteUser);

router.put('/:id', authenticate, updateUser);

module.exports = router;