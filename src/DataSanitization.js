const express = require("express");
require("./Config/database");

const connectDB = require("./Config/database");
const User = require("./Models/user");

// app 
const app = express();
// express.json() is a middleware that will parse the JSON data from the request body
app.use(express.json());

app.post("/signup",async (req,res) => {
    
    
    // creating a new instance of the User model
    // const user = new User({
    //     firstName: "Sachin",
    //     lastName: "tendulkar",
    //     email: "Sachin@saini2.com",
    //     password: "akshya@1234",
    // });

    //creating a new instance of the User model  

    console.log(req.body);
    const user = new User(req.body);
     
    try {
          await user.save();
          res.send("User added SucessFully");
    } catch (error) {
        res.status(500).send("User added SucessFully");
    }
    
})

// Always do async await for any db actions and use try catch..
// Get the user by email
app.get("/user", async(req, res)=> {
   const userEmail = req.body.email;
   try{
    // finding the user by email
    // const user =await User.find({email: userEmail});

    // if you want to find all the user..
    // const user =await User.find({});

    // findone will return only one user
    const user =await User.findOne({email: userEmail});

    if(user.length === 0) {
        return res.status(404).send("User not found");
    }
    else{
        // sending back the user
        res.send(user)
    }
   }
   catch(err) {
    console.log(err);
   }
})

// Feed API - GET/feed - get all the users from the database..
app.get("/feed", (req, res) => {
   
})

// delete the user from the database
app.delete("/user", async(req, res) => {
    const userId = req.params.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    } catch (error) {
        res.status(500).send("User deleted successfully");
    }
})

// update the user in the database
app.patch("/user", async(req,res) =>{
    const userId = req.params.userId;
    const data = req.body;
    try {
        await User.findByIdAndUpdate({_id: userId}, data, {returnDocument: "before "});
        res.send("User Updated successfully");
    } catch (error) {
        res.status(500).send("User Updated successfully");
    }
})



// once your database connection established successfully then only start listening to the requests on server
connectDB()
    .then(() => {
        console.log("Database connection successful")
        app.listen(3000, () => [ 
    console.log("Server is successfully listening on port 3000...")]);
    }) 
    .catch((err) => console.log("Database connection failed"));

