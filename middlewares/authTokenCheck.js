const jwt = require("jsonwebtoken");

const {User} = require("../models/user");

const {HttpError} = require("../helpers");

const { SECRET_KEY } = process.env;

const authTokenCheckMiddleware = async (req, res, next) => {
    if (req.method === "POST") {
    return next();
    }
        const [, token] = req.headers.authorization.split(" ");
    if (!token) {
        next(new NotAuthorizedError("Not authorized"));
    }
    try {
        const user = jwt.verify(token, SECRET_KEY);
        const dbUser = await User.findOne({ _id: user._id });
    if (token !== dbUser.token) next(HttpError(401, "Not authorized"));
        req.user = user;
    next();
    } catch (error) {
        next(HttpError(error.message));
    }
};

module.exports = {
    authTokenCheckMiddleware,
};