const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: Array,
            default: "user",
        },
    },
    {
        timestamps: true,
    }
);

//Modèle
const UserModel = mongoose.model("User", userSchema); //Params : Nom collection (qui sera mis au pluriel automatiquement), schema
module.exports = UserModel;