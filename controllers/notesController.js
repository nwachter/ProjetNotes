// const UserModel = require('../models/User');
// const NoteModel = require('../models/Note');
// const { readData, writeData } = require('../utils/fileHandler');
// const { MongoClient, ObjectId } = require('mongodb');

// //Get All Notes

// const getAllNotes = async (req, res) => {
//     const MONGODB_URI = process.env.MONGODB_URI;
//     let client;
//     try {
//         client = new MongoClient(MONGODB_URI);
//         // const data = readData("notes");
//         // const database = client.db('ProjetNotes');
//         // const notesCollection = database.collection('notes');
//         // const options = { ordered: true };
//         // const data = await notesCollection.find({}, options)?.toArray();

//         const data = await NoteModel.find({}).exec();

//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch notes" });
//     }
//     finally {
//         await client.close();
//     }
// }

// //Get Note by id
// // const getNoteById = (req, res) => {
// //     const data = readData("notes");
// //     const note = data.find((note) => note.id === parseInt(req.params.id));
// //     if (!note) {
// //         return res.status(404).json({ error: "Note not found" });
// //     }
// //     res.json(note);
// // }
// const getNoteById = async (req, res) => {
//     const MONGODB_URI = process.env.MONGODB_URI;
//     let client;
//     try {
//         client = new MongoClient(MONGODB_URI);
//         // const data = readData("notes");
//         const database = client.db('ProjetNotes');
//         const notesCollection = database.collection('notes');
//         const objectId = new ObjectId(req.params.id);
//         const data = await notesCollection.findOne({ _id: objectId });

//         if (!data) {
//             return res.status(404).json({ error: `Note #${req.params.id} not found` });
//         }

//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: `Failed to get note #${req.params.id}` });
//     }
//     finally {
//         await client.close();
//     }
// }


// const getNotesByCreatorId = async (req, res) => {
//     const MONGODB_URI = process.env.MONGODB_URI;
//     let client;
//     try {
//         client = new MongoClient(MONGODB_URI);
//         // const data = readData("notes");
//         const database = client.db('ProjetNotes');
//         const notesCollection = database.collection('notes');
//         const creatorId = new ObjectId(req.params.id);

//         const data = await notesCollection.find({ creator_id: creatorId })?.toArray();

//         if (!data.length) {
//             return res.status(404).json({ message: `No notes found for creator #${req.params.id}` });
//         }

//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: `Failed to get note of creator #${req.params.id}` });
//     }
//     finally {
//         await client.close();
//     }
// }

// //Create Note
// // const createNote = (req, res) => {
// //     const data = readData("notes");
// //     const newNote = {
// //         id: data.length > 0 ? data[data.length - 1].id + 1 : 1, //Auto increment ID
// //         //Test si il y a des objets => incrémenter de 1 SINON ajouter id 1
// //         ...req.body

// //     };
// //     data.push(newNote);
// //     writeData(data, "notes");
// //     res.status(201).json(newNote);
// // }
// const createNote = async (req, res) => {
//     const MONGODB_URI = process.env.MONGODB_URI;
//     let client;

//     try {
//         client = new MongoClient(MONGODB_URI);
//         await client.connect();

//         const database = client.db('ProjetNotes');
//         const notesCollection = database.collection('notes');

//         const data = await notesCollection.insertOne(req.body);

//         res.status(201).json(data);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to create note" });
//     } finally {
//         await client.close();
//     }
// };



// //Delete Note
// // const deleteNote = (req, res) => {
// //     const data = readData("notes");
// //     const updatedData = data.filter((Note) => Note.id !== parseInt(req.params.id));

// //     if (data.length === updatedData.length) {
// //         return res.status(404).json({ error: "Note not found" });
// //     }
// //     writeData(updatedData, "notes");

// //     console.log(`Note with ID ${req.params.id} deleted`);

// //     res.status(200).json({ message: `Note with ID ${req.params.id} deleted` });

// // }
// const deleteNote = async (req, res) => {
//     const MONGODB_URI = process.env.MONGODB_URI;
//     let client;

//     try {
//         client = new MongoClient(MONGODB_URI);
//         await client.connect();

//         const database = client.db('ProjetNotes');
//         const notesCollection = database.collection('notes');
//         const objectId = new ObjectId(req.params.id);

//         // Corrected method to insert one note
//         const data = await notesCollection.deleteOne({ _id: objectId });

//         res.status(201).json(data); // Use 201 for successful deletion
//     } catch (error) {
//         console.error(error); // Log error for debugging
//         res.status(500).json({ error: "Failed to delete note" });
//     } finally {
//         await client.close();
//     }
// };


// // const updateNote = (req, res) => {
// //     const data = readData();
// //     const noteIndex = data.findIndex((note) => note.id === parseInt(req.params.id));

// //     if (noteIndex === -1) {
// //         return res.status(404).json({ error: "Note not found" });
// //     }
// //     data[noteIndex] = {
// //         id: parseInt(req.params.id),
// //         ...req.body
// //     };
// //     writeData(data, "notes");
// //     res.json(data[noteIndex])
// // }


// const updateNote = async (req, res) => {
//     const MONGODB_URI = process.env.MONGODB_URI;
//     let client;

//     try {
//         client = new MongoClient(MONGODB_URI);
//         await client.connect();

//         const database = client.db('ProjetNotes');
//         const notesCollection = database.collection('notes');

//         const data = await notesCollection.findOneAndUpdate(
//             { _id: ObjectId(req.params.id) },
//             { $set: req.body },
//             { returnDocument: "after" }
//         );

//         if (!data.value) {
//             return res.status(404).json({ error: "Note not found" });
//         }

//         res.status(200).json(data.value);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to update note" });
//     } finally {
//         await client.close();
//     }
// };


// async function runAndImportData() {

//     // let client;

//     // client = MongoClient(process.env.MONGODB_URI);

//     try {
//         // await client.connect();
//         // const database = client.db('ProjetNotes');
//         await importUsers(database);
//         await importNotes(database);
//     } catch (err) {
//         console.error(err);
//     }
//     // finally {
//     //     await client.close();
//     // }
// }


// // async function importNotes(database) {
// //     try {

// //         const results = await NoteModel.insertMany(notes, options);
// //         return results.insertedCount;
// //     } catch (error) {
// //         console.error('Error importing notes:', error);
// //     }
// // }


// async function importUsers(users, options = {}) {
//     try {
//         if (!users || users.length === 0) {
//             console.warn('No users to import');
//             return 0;
//         }

//         const processedUsers = users.map(userData => new UserModel({
//             // Any transformations or additional processing
//             ...userData,
//             // Example: additional field normalization
//             // email: userData.email.toLowerCase(),
//             // createdAt: new Date()
//         }));
//         const results = await UserModel.insertMany(processedUsers, options);
//         console.log("Inserted Users : ", results.length);

//         return results.length;

//     } catch (error) {
//         console.error('Error importing users:', error);
//         return 0; // Consistent error handling by returning 0
//     }
// }

// async function importNotes(notes, options = {}) {
//     try {
//         if (!notes || notes.length === 0) {
//             console.warn('No notes to import');
//             return 0;
//         }

//         const processedNotes = notes.map(notesData => new NoteModel({
//             ...notesData,
//         }));
//         const results = await NoteModel.insertMany(processedNotes, options);
//         console.log("Inserted Notes : ", results.length);
//         return results.length;
//     } catch (error) {
//         console.error('Error importing notes:', error);
//         return 0;
//     }
// }


// const addCreatorIdToNotes = async () => {
//     const MONGODB_URI = process.env.MONGODB_URI;

//     let client;

//     try {
//         client = new MongoClient(MONGODB_URI);
//         await client.connect();

//         const database = client.db('ProjetNotes');
//         const notesCollection = database.collection('notes');

//         const creatorId = ObjectId("676175f37545ab140fb17ca2");

//         // Update all documents
//         const result = await notesCollection.updateMany(
//             {},  // No filter, targets all notes
//             { $set: { creator_id: creatorId } }
//         );

//         console.log(`${result.modifiedCount} notes updated with creator_id.`);
//     } catch (error) {
//         console.error("Failed to update notes:", error);
//     } finally {
//         await client.close();
//     }
// };

// module.exports = { importNotes, importUsers, getAllNotes, getNotesByCreatorId, getNoteById, createNote, deleteNote, updateNote };

const UserModel = require('../models/User');
const NoteModel = require('../models/Note');
const { ObjectId } = require('mongoose').Types;

// Get All Notes
const getAllNotes = async (req, res) => {
    try {
        const data = await NoteModel.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
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
        const newNote = new NoteModel(req.body);
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
    getNotesByCreatorId,
    getNoteById,
    createNote,
    deleteNote,
    updateNote
};