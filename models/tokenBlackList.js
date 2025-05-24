const mongoose = require("mongoose");

const TokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

const TokenBlacklistModel = mongoose.model("Tokenblacklist", TokenBlacklistSchema);

module.exports = TokenBlacklistModel;