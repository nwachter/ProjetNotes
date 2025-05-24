const express = require('express');
const router = express.Router();
const { getAllTags, getTagById, createTag, updateTag, deleteTag } = require('../controllers/tagsController');
const { verifyToken } = require('../middlewares/verifyToken');


router.get('/', getAllTags);

router.get('/:id', getTagById);

router.post('/', verifyToken,createTag);

router.patch('/:id', verifyToken, updateTag); //Attention, avant : put

router.delete('/:id', verifyToken, deleteTag);

module.exports = router;