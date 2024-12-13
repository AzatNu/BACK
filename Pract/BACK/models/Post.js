const mongoose = require("mongoose");
const validator = require("validator");

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: false,
        validate: validator.isURL,
        message: "Некорректная ссылка"
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;