const { Schema, model } = require("mongoose");
const { creatHmac } = requie("crypto");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: "/Users/pranshusama/Downloads/Node-JS/Youtube-Blog/public/images/default.png"

    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    }
}, { timestamps: true });

const User = model("user", userSchema);

module.exports = {
    User,
}
