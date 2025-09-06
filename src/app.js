const express = require("express");
// 
// app 
const app = express();

app.use("/hello",(req,res) =>{
    res.send("Hello from the Hello Server!");
});

app.use("/test",(req,res) =>{
    res.send("Hello from the Server!");
});

app.listen(3000, () => [ 
    console.log("Server is successfully listening on port 3000...")
]);