const Post = require("../models/Post");

const addPost = async (post) => {
    return await Post.create(post);
}
const editPost = async (id, post) => {
    const newPost = await Post.findByIdAndUpdate(id, post);
    return newPost;
}

const deletePost = async (id) => {
    return await Post.deleteOne({ _id: id });
}
const getPosts = async (search = "", limit = 10, page = 1) => {
    const [posts, count] = await Promise.all([
        Post.find({ title: { $regex: search, $options: "i" } }).limit(limit).skip((page - 1) * limit)
            .sort({ createdAt: -1 }),
        Post.countDocuments({ title: { $regex: search, $options: "i" } })
    ])
    return { posts, lastPage: Math.ceil(count / limit) };
}
const getPost = async (id) => {
    return await Post.findById(id);
}

module.exports = { addPost, editPost, deletePost, getPosts, getPost };