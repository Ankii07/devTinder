const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const profileRouter = express.Router();

profileRouter.get("/profile",userAuth,async(req, res) => {
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

module.exports = profileRouter;