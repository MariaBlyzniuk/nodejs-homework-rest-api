const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpError, ctrlWrapper  } = require("../helpers");
const { User } = require("../models/user");

const {SECRET_KEY} = process.env;

const registration = async (body) => {
    const checkEMail = await User.findOne({ email: body.email });
    if (checkEMail) {
    throw HttpError(409, "Email in use");
    }

    const user = new User(body);
    return await user.save();
};
const login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user && !(await bcrypt.compare(password, user.password)))
    throw HttpError(401, "Email or password is wrong");

    const token = jwt.sign(
    {
        _id: user._id,
        createdAt: user.createdAt,
    },
    SECRET_KEY,
    { expiresIn: "1d" }
    );
    await User.findByIdAndUpdate(user._id, { $set: { token } });
    return { user, token };
};

const logout = async (userId) => {
    await User.findOneAndUpdate({ _id: userId }, { $set: { token: null } });
};

const currentUser = async (userId) => {
    const { email, subscription } = await User.findOne({ _id: userId });
    return { email, subscription };
};

const updateSubscription = async (userId, subscription) => {
    await User.findByIdAndUpdate(userId, { $set: {subscription} });
};

module.exports = {
    registration,
    login,
    logout,
    currentUser,
    updateSubscription,
};