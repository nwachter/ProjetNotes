const UserModel = require('../models/User');
const NoteModel = require('../models/Note');
const { verifyTokenAndGetUserInfo } = require('./authController');
const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');

// Get All Notes
const getAllNotes = async (req, res) => {
    try {
        const data = await NoteModel.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
}

const getNotesByTag = async (req, res) => {
    try {
        if(!req.params.tags) {
            res.status(400).json({error: "No tag was given"});
        }
        const data = await NoteModel.find({ tags: req.params.tags });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes by tag" });
    }
}

// Get Note by id
const getNoteById = async (req, res) => {
    try {
        const data = await NoteModel.findById(req.params.id);

        if (!data) {
            return res.status(404).json({ error: `Note #${req.params.id} not found` });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: `Failed to get note #${req.params.id}` });
    }
}

// Get Notes by Creator ID
const getNotesByCreatorId = async (req, res) => {
    try {
        const data = await NoteModel.find({ creator_id: req.params.id });

        if (!data.length) {
            return res.status(404).json({ message: `No notes found for creator #${req.params.id}` });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: `Failed to get note of creator #${req.params.id}` });
    }
}

// Create Note
const createNote = async (req, res) => {
    try {

        const token = req.cookies.token;
    
            const userData = jwt.verify(token, process.env.SECRET);
            if(!userData){
                return res.status(401).json({ error: "Could not verify user" });
            }
        
        const newNote = new NoteModel({...req.body, creator_id: userData?.id});
        const data = await newNote.save();
        res.status(201).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create note" });
    }
};

// Delete Note
const deleteNote = async (req, res) => {
    try {
        const data = await NoteModel.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.status(200).json({ message: `Note with ID ${req.params.id} deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete note" });
    }
};

// Update Note
const updateNote = async (req, res) => {
    try {
        const data = await NoteModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!data) {
            return res.status(404).json({ error: "Note not found" });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update note" });
    }
};

// Import Users
async function importUsers(users, options = {}) {
    try {
        if (!users || users.length === 0) {
            console.warn('No users to import');
            return 0;
        }

        const processedUsers = users.map(userData => new UserModel({
            ...userData,
        }));
        const results = await UserModel.insertMany(processedUsers, options);
        console.log("Inserted Users : ", results.length);

        return results.length;
    } catch (error) {
        console.error('Error importing users:', error);
        return 0;
    }
}

// Import Notes
async function importNotes(notes, options = {}) {
    try {
        if (!notes || notes.length === 0) {
            console.warn('No notes to import');
            return 0;
        }

        const processedNotes = notes.map(notesData => new NoteModel({
            ...notesData,
        }));
        const results = await NoteModel.insertMany(processedNotes, options);
        console.log("Inserted Notes : ", results.length);
        return results.length;
    } catch (error) {
        console.error('Error importing notes:', error);
        return 0;
    }
}

// Add Creator ID to Notes
const addCreatorIdToNotes = async () => {
    try {
        const creatorId = new ObjectId("676175f37545ab140fb17ca2");

        const result = await NoteModel.updateMany(
            {},
            { $set: { creator_id: creatorId } }
        );

        console.log(`${result.modifiedCount} notes updated with creator_id.`);
    } catch (error) {
        console.error("Failed to update notes:", error);
    }
};

module.exports = {
    importNotes,
    importUsers,
    getAllNotes,
     getNotesByTag,
    getNotesByCreatorId,
    getNoteById,
    createNote,
    deleteNote,
    updateNote,
};