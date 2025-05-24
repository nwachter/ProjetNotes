const express = require('express');
const router = express.Router();
const { getAllNotes, getNoteById, getNotesByCreatorId, createNote, deleteNote, updateNote, getNotesByTag } = require('../controllers/notesController');
const { authenticate } = require('../middlewares/authMiddleware');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/', getAllNotes);

router.get('/:id', getNoteById);

router.get('/by-creator/:id', getNotesByCreatorId);

router.get('/by-tag/:id', getNotesByTag);

router.post('/', verifyToken, createNote);

router.delete('/:id', verifyToken, deleteNote);

router.patch('/:id', verifyToken, updateNote); //Attention, avant : put

module.exports = router;