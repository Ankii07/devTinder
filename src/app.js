const express = require("express");
require("./Config/database");

const connectDB = require("./Config/database");
const User = require("./Models/user");

// app 
const app = express();
// order of making the routes matters


// app.use("/hello",(req,res) =>{
//     res.send("Hello from the Hello Server!");
// });

// app.use("/test",(req,res) =>{
//     res.send("Hello from the Server!");
// });

// app.use("/",(req,res) => {
//     res.send("Hello from the Home Server!");
// });

// this will match only GET requests for the /user route
// req/user, /user/xyz, /user/1
// app.get("/user",(req,res) => {
//     // sending back the data in JSON format
//     res.send({firstName: "John", lastName: "Doe" });
// });

// // route ab?c means ab followed by 0 or 1 characters and b is optional
// app.get("/ab?c",(req,res) => {
//     // sending back the data in JSON format
//     res.send({firstName: "John", lastName: "Doe" });
// });

// // route ab+c means ab followed by 1 or more characters
// app.get("/ab+c",(req,res) => {
//     // sending back the data in JSON format
//     res.send({firstName: "John", lastName: "Doe" });
// });

// // route ab*cd means ab followed by 0 or more characters and cd
// app.get("/ab*cd",(req,res) => {
//     // sending back the data in JSON format
//     res.send({firstName: "John", lastName: "Doe" });
// });

// app.get("/regex",(req,res) => {
//     // sending back the data in JSON format
//     res.send({firstName: "John", lastName: "Doe" });
// });

// app.get(/.*fly$/,(req,res) => {
//     // sending back the data in JSON format
//     res.send({firstName: "John", lastName: "Doe" });
// });

// // route a(bc)?d means a followed by 0 or 1 characters and bc
// app.get("/a(bc)?d",(req,res) => {
//     // sending back the data in JSON format
//     res.send({firstName: "John", lastName: "Doe" });
// });

// app.get("/user/:userId/",(req,res) => {
//     //req.params is used to get the parameters from the URL
//     //req.body is used to get the data from the request body
//     //req.query is used to get the query parameters from the URL
//     console.log(req.params);
//     // console.log(req.body);
//     // console.log(req.query);
//     res.send("Hello User");
// })

// // this will match only POST requests for the /user route
// app.post("/user",(req,res) => {
//     //saving the data to the database
//     res.send("Data successfully saved to the database!");
// });

// // this will match only DELETE requests for the /user route
// app.delete("/user",(req,res) => {
//     //deleting the data from the database
//     res.send("Data successfully deleted from the database!");
// });
// // This will never be executed because the above route matches all HTTP methods
// // and the order of routes matters in Express.js
// // If you change the order, this route will work

// // app.use("/user",(req,res) => {
// //     res.send("Hello User");
// // });

// // this will match all HTTP methods (GET, POST, PUT, DELETE, etc.) for the /test route
// app.use("/test",(req,res) =>{
//     res.send("Hello from the Server!");
// });


app.post("/signup",async (req,res) => {
    const userObj = {
        firstName: "Akshya",
        lastName: "Saini",
        emailId: "akshya@saini.com",
        password: "akshya@123",
    }
    
    // creating a new instance of the User model
    const user = new User({
        firstName: "Sachin",
        lastName: "tendulkar",
        email: "Sachin@saini2.com",
        password: "akshya@1234",
    });
 
    try {
          await user.save();
          res.send("User added SucessFully");
    } catch (error) {
        res.status(500).send("User added SucessFully");
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

