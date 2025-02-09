const UserModel = require('../models/User');
const NoteModel = require('../models/Note');
const { verifyTokenAndGetUserInfo } = require('./authController');
const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');
const TagModel = require('../models/Tag');

const getAllTags = async (req, res) => {
    try {
        const data = await TagModel.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tags" });
    }
}



const getTagById = async (req, res) => {
    try {
        const data = await TagModel.findById(req.params.id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tag by id" });
    }
}

const createTag = async (req, res) => {
    try {
        const data = await TagModel.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to create tag" });
    }
}

const createTags = async (req, res) => {
    try {
        const data = await TagModel.insertMany(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to create tags" });
    }
}

const updateTag = async (req, res) => {
    try {
        const data = await TagModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to update tag" });
    }
}

const deleteTag = async (req, res) => {
    const tagId = req.params.id;
    if (!tagId) {
        return res.status(400).json({ error: "Tag id is required" });
    }
    try {
        const data = await TagModel.findByIdAndDelete(tagId);
        if (!data) {
            return res.status(404).json({ error: "Tag not found" });
        }

        res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete tag" });
    }
}



const updateNoteTags = async (req, res) => {
    try {
        const notes = await NoteModel.find();
        const tagIds = {};

        for (const note of notes) {
            const tagNames = note.tags;
            const ids = [];

            for (const name of tagNames) {
                let tag = await TagModel.findOne({ name });
                if (!tag) {
                    tag = await TagModel.create({ name });
                }
                ids.push(tag._id);
            }
            note.tags = ids;
            await note.save();
        }

        res.status(200).json({ message: "Notes updated successfully" });
    } catch (error) {
        console.error('Failed to update note tags:', error);
        res.status(500).json({ error: "Failed to update note tags" });
    }
};



module.exports = { getAllTags, getTagById, createTag, createTags, updateTag, deleteTag, updateNoteTags };