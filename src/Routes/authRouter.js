const express = require("express");
const authRouter = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSignUpData } = require("../Utils/Validation");


authRouter.post("/signup", async (req, res) => {    //creating a new instance of the User model  
    
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
        //saving the data to the database  
        await user.save();
        res.send("User added SucessFully");
    } catch (err) {
        console.log(err);
        res.status(400).send("ERROR : ", err.message);
    }

})

authRouter.post('/login', async (req, res) => {
     try{
      const {email, password} = req.body;

      console.log(email);
      console.log(password);
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
        const token = await user.getJWT();

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

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(0)
    });
    res.send("Logout Successfull");
})

module.exports = authRouter;