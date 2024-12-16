const express = require('express');
const router = express.Router();
const { getAllNotes, getNoteById, createNote, deleteNote, updateNote, getAllPostsController } = require('../controllers/notesController');

router.get('/', getAllNotes);

router.get('/:id', getNoteById);

router.post('/', createNote);

router.delete('/:id', deleteNote);

router.put('/:id', updateNote);

router.get("/posts", getAllPostsController);
module.exports = router;