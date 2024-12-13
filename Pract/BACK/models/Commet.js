const mongoose = require("mongoose");


const CommentSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    published_at: {
        type: String,
        required: true
    },
}, { timestamps: true });
const Comment = mongoose.model("Comment", CommentSchema);

module.exports =  Comment;