const mongoose = require("mongoose");
const roles = require("../consts/roles");

const UserSchema = mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role_id: {
        type: String,
        default: roles.READER
    }
}, { timestamps: true });
const User = mongoose.model("User", UserSchema);

module.exports = User;