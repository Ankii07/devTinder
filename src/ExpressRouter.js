const express = require("express");
require("./Config/database");
const connectDB = require("./Config/database");
const User = require("./Models/user");
const { validateSignUpData } = require("./Utils/Validation"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser= require("cookie-parser");
const { userAuth } = require("./Middlewares/auth");

// app 
const app = express();

// express.json() is a middleware that will parse the JSON data from the request body
app.use(express.json());

// cookieParser is a middleware that will parse the cookie data from the request
app.use(cookieParser());


const authRouter = require("./Routes/authRouter");
const profileRouter = require("./Routes/Profile");
const requestRouter = require("./Routes/request");
const userRouter = require("./Routes/user");

// express Routers
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// once your database connection established successfully then only start listening to the requests on server
connectDB()
    .then(() => {
        console.log("Database connection successful")
        app.listen(3000, () => [
            console.log("Server is successfully listening on port 3000...")]);
    })
    .catch((err) => console.log("Database connection failed"));

