const express = require('express');
const router = express.Router();
const { getAllNotes, getNoteById, getNotesByCreatorId, createNote, deleteNote, updateNote } = require('../controllers/notesController');
const { authenticate } = require('../middlewares/authMiddleware');
const { verifyToken } = require('../middlewares/verifyToken');
router.get('/', getAllNotes);



router.get('/:id', getNoteById);

router.get('/by-creator/:id', getNotesByCreatorId);

router.post('/', verifyToken, createNote);

router.delete('/:id', verifyToken, deleteNote);

router.put('/:id', verifyToken, updateNote);

module.exports = router;