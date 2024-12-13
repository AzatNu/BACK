const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { register, login, getUsers, getRoles, deleteUser, editUser } = require("./controllers/user");
const { getPosts, getPost, addPost, editPost, deletePost } = require("./controllers/posts");
const mapUser = require("./helpers/mapUser");
const mapPost = require("./helpers/mapPost");
const authenticated = require("./middlewares/authenticated");
const hasRole = require("./middlewares/hasRole");
const token = require("./helpers/token");
const ROLE = require("./consts/roles");
const PORT = 3005;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
    try {
        const { user, token } = await register(req.body.login, req.body.password);
        res.cookie("token", token, {
            httpOnly: true
        });
        res.send({
            error: null,
            user: mapUser(user)
        });
    }
    catch (error) {
        res.send({
            error: error.message || "Произошла неизвестная ошибка"
        });
    }
});
app.post("/login", async (req, res) => {
    try {
        const { user, token } = await login(req.body.login, req.body.password);
        res.cookie("token", token, {
            httpOnly: true
        }).send({
            error: null,
            user: mapUser(user)
        });
    } catch (error) {
        res.send({
            error: error.message || "Произошла неизвестная ошибка"
        });
    }
});
app.post("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true
    }).send({
    });
})
app.get("/posts", async (req, res) => {
    const {posts, lastPage} = await getPosts(req.query.search, req.query.limit, req.query.page);
    res.send({
        data: posts.map(mapPost),
        lastPage
    });
})
app.get("/posts/:id", async (req, res) => {
    const post = await getPost(req.params.id);
    res.send({
        data:{data: mapPost(post)}
    });
})
app.use(authenticated);

app.post("/posts", hasRole([ROLE.ADMIN]), async (req, res) => {
    const newPost = await addPost({
        title: req.body.title,
        content: req.body.content,
        image_url: req.body.image_url,
    });
    res.send({
        data: mapPost(newPost)
    });
});
app.patch("/posts/:id", hasRole([ROLE.ADMIN]), async (req, res) => {
    const newPost = await editPost(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        image_url: req.body.image_url,
    });
    res.send({
        data: mapPost(newPost)
    });
});
app.delete("/posts/:id", hasRole([ROLE.ADMIN]), async (req, res) => {
    await deletePost(req.params.id);
    res.send({});
})
app.get("/users", async (req, res) => {
    try {
        const users = await getUsers();
        res.send({
            data: users.map(mapUser)
        });
    } catch (error) {
        res.send({
            error: error.message || "Произошла неизвестная ошибка"
        });
    }
});
app.get("/users/roles", hasRole([ROLE.ADMIN]), async (req, res) => {
    try {
        const roles = await getRoles();
        res.send({ data: roles });
    } catch (error) {
        res.send({
            error: error.message || "Произошла неизвестная ошибка"
        });
    }
});
app.patch("/users/:id", hasRole([ROLE.ADMIN]), async (req, res) => {
    const newUser = await editUser(req.params.id, { role_id: req.body.role_id });
    res.send({
        data: mapUser(newUser)
    });
});
app.delete("/users/:id", hasRole([ROLE.ADMIN]), async (req, res) => {
    await deleteUser(req.params.id);
    res.send({});
})
mongoose.connect("mongodb+srv://azattix:Azattix12@cluster0.oebxh.mongodb.net/BLOG?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Соединение с MongoDB успешно установлено.");
    app.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}...`);
    });
}).catch((err) => {
    console.error("Ошибка соединения с MongoDB:", err);
});

