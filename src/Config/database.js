const mongoose = require("mongoose");

const connectDB = async() =>{
     await mongoose.connect("mongodb+srv://ak6591828_db_user:j3J5SGmkq7NX8D9z@node.pseogzn.mongodb.net/DevTinder");
};

module.exports = connectDB;

  