const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,  // Array of Tag references
        ref: "Tag",
        required: true,
        default: [],
    }],
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

const NoteModel = mongoose.model("Note", noteSchema);

module.exports = NoteModel;