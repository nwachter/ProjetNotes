const express = require('express');
const router = express.Router();
const { getAllNotes, getNoteById, getNotesByCreatorId, createNote, deleteNote, updateNote } = require('../controllers/notesController');
const { authenticate } = require('../middlewares/authMiddleware');
router.get('/', getAllNotes);



router.get('/:id', getNoteById);

router.get('/by-creator/:id', getNotesByCreatorId);

router.post('/', authenticate, createNote);

router.delete('/:id', authenticate, deleteNote);

router.put('/:id', authenticate, updateNote);

module.exports = router;