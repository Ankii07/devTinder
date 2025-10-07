const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateEditProfileData } = require("../Utils/Validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth,async(req, res) => {
    // get the token from the cookie
    // whenever you have to read a cookie you need a middleware which is express.cookieParser
   try{
    const user = req.user;
    console.log(user);
    console.log("logged In user is " + user.firstName + " " + user.lastName);  
    res.send(user);
   }catch(err){
       console.log(err);
   }
})

profileRouter.patch("/profile/edit",userAuth, async(req,res) =>{
    try{
      if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit Request");
      };
      const LoggedInUser = req.user;
    // updating the saved user details
      Object.keys(req.body).forEach((key) => (LoggedInUser[key] = req.body[key]));
      console.log("Logged In User",LoggedInUser);
      res.send("Updatd SucessFully");
    }catch(err){
      res.status(400).send("ERROR: " + err.message);
    }
     
})

module.exports = profileRouter;