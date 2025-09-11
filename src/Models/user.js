const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type:String
    },
    lastName: {
        type:String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender:{
        type: String
    },
    // created_at: {
    //     type: Date,
    //     default: Date.now
    // },
    // updated_at: {
    //     type: Date,
    //     default: Date.now
    // }
});

const User = mongoose.model("user", userSchema);

module.exports = User;