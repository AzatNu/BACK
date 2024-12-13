const User = require("../models/User");
const { verify } = require("../helpers/token");
const { request } = require("express");
module.exports =  async (req, res, next) => {
    const tokenData = verify(req.cookies.token);
    const user = await User.findById({_id: tokenData._id});
    if (!user) {
        res.send({error: "Пользователь не зарегистрирован"});
        return
    }
    request.user = user;
    next();
}