const express = require('express');
const router = express.Router();
const { getAllNotes, getNoteById, createNote, deleteNote, updateNote, getAllPostsController } = require('../controllers/notesController');
// router.get('/', (req, res) => {
//     // res.send('voilà la page ');
//     let error = null;
//     res.render('index', {
//         error: error
//     })
// });

router.get('/', getAllNotes);

router.get('/:id', getNoteById);

router.post('/', createNote);

router.delete('/:id', deleteNote);

router.put('/:id', updateNote);

router.get("/posts", getAllPostsController);
module.exports = router;
