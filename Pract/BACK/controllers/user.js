const bcrypt = require("bcrypt");
const User = require("../models/User");
const ROLE = require("../consts/roles");
const { generate } = require("../helpers/token");
const token = require("../helpers/token");

const register = async (login, password) => {
    if (!password) {
        throw new Error("Пароль пустой");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ login, password: passwordHash });
    const token = generate({ _id: user._id });
    return { user, token };

}
const login = async (login, password) => {
    const user = await User.findOne({ login });
    if (!user) {
        throw new Error("Пользователь c таким логином не зарегистрирован");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Неверный пароль");
    }
    const token = generate({ _id: user._id });
    return { user, token };
}

const  getUsers = () => {
    return User.find();
}

const getRoles = () => {
    return [{ id: ROLE.ADMIN, name: "Администратор" },
    { id: ROLE.MODERATOR, name: "Модератор" },
    { id: ROLE.READER, name: "Читатель" },
    { id: ROLE.GUEST, name: "Гость" },
    ]
}
const deleteUser = async (id) => {
    return await User.findByIdAndDelete({ _id: id });
}
const editUser = async (id, userData) => {
    return User.findByIdAndUpdate(id, userData, { returnDocument: "after" })
}


module.exports = { register, login, getUsers, getRoles, deleteUser, editUser };