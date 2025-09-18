const express = require("express");
require("./Config/database");
const connectDB = require("./Config/database");
const User = require("./Models/user");
const { validateSignUpData } = require("./Utils/Validation"); // const validateSignUpData = require("./Utils/Validation");
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

app.post("/signup", async (req, res) => {    //creating a new instance of the User model  
    
    const  {firstName, lastName, email, password} = req.body;

    try {
         // DO validation in the try catch block only.
         // Validation of data..
         validateSignUpData(req);
         // Encrypt the password..
         const passwordHash = await bcrypt.hash(password, 10);
        //  console.log(passwordHash);
         const user = new User({
             firstName,
             lastName,
             email,
             password: passwordHash
         })
        await user.save();
        res.send("User added SucessFully");
    } catch (err) {
        console.log(err);
        res.status(400).send("ERROR : ", err.message);
    }

})

app.post('/login', async (req, res) => {
     try{
      const {email, password} = req.body;
     //check wether the user exists or not
     const user = await User.findOne({email});  
     if(!user){
         return res.status(404).send("Invalid credentials");
     }
     //check wether the password is correct or not
     //const isPassWord = await bcrypt.compare(password, user.password);
     const isPassWord = await user.validatePassword(password);

      if(isPassWord){
        // create a JWT Token..
         
        // const token = jwt.sign({
        //     // email: user.email,
        //     _id: user._id
        // }, "secret",{expiresIn: "1h"});
         
        const token = await user.getJWT();

        // console.log(token);

        // Add the token to the cookie and send back to the user..
        //  res.cookie("token",token,{httpOnly: true, maxAge: 60*60*1000});
         res.cookie("token",token);


          res.send("Login Successfull");
      }
      else{
          throw new Error("Invalid credentials");
      }
     }catch(err){
         res.status(500).send("login failed", err.message);
     }
})

app.get("/profile",userAuth,async(req, res) => {
    // get the token from the cookie
    // whenever you have to read a cookie you need a middleware which is express.cookieParser
   try{
    //  const cookie = req.cookies;
    // console.log(cookie)
    
    // const {token} = cookie;
    // if(!token){
    //     throw new Error("Unauthorized");
    // }
    // validate the token..
    // const decoded_Message = jwt.verify(token, "secret");
    // console.log(decoded_Message);
    // const {_id} = decoded_Message;
    //   const user = await User.findOne({_id});
    // const userName = 

    const user = req.user;
    console.log(user);
    console.log("logged In user is " + user.firstName + " " + user.lastName);  
    res.send(user);
   }catch(err){
       console.log(err);
   }
})

// Always do async await for any db actions and use try catch..
// Get the user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.email;
    try {
        // finding the user by email
        // const user =await User.find({email: userEmail});

        // if you want to find all the user..
        // const user =await User.find({});

        // findone will return only one user
        const user = await User.findOne({ email: userEmail });

        if (user.length === 0) {
            return res.status(404).send("User not found");
        }
        else {
            // sending back the user
            res.send(user)
        }
    }
    catch (err) {
        console.log(err);
    }
})

// Feed API - GET/feed - get all the users from the database..
app.get("/feed", (req, res) => {

})

// delete the user from the database
app.delete("/user", async (req, res) => {
    const userId = req.params.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
        res.status(500).send("User deleted successfully");
    }
})

// update the user in the database
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;

    const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"];
    //  update is not allowed for some random values.. 
    const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

    if (!isUpdateAllowed) {
        return res.status(400).send("Update is not allowed");
    }

    if (data?.skills.length > 10) {
        throw new Error("Skills cannot be more than 10");
    }

    try {
        // await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: "before "});
        const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"];
        //  update is not allowed for some random values.. 
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if (!isUpdateAllowed) {
            throw new Error("Update  not allowed");
        }
        await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true,
        },

        );
        res.send("User Updated successfully");
    } catch (error) {
        res.status(500).send("Update Failed:", error.message);
    }
})

// you can send the request only when you are logged in..
app.post("/sendConnectionRequest",userAuth, async(req,res) => {
    const user = req.user;
    // sending a connection request
    console.log("Sending a connection request");

    res.send(user.firstName + " sent the connect request!");
})


// once your database connection established successfully then only start listening to the requests on server
connectDB()
    .then(() => {
        console.log("Database connection successful")
        app.listen(3000, () => [
            console.log("Server is successfully listening on port 3000...")]);
    })
    .catch((err) => console.log("Database connection failed"));

