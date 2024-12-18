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
    tags: {
        type: Array,
        required: true,
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
},
    {
        timestamps: true
    }
);

const NoteModel = mongoose.model("Note", noteSchema);

module.exports = NoteModel;