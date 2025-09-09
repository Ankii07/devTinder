const express = require("express");
// 
// app 
const app = express();

// if we will not send the request back to the client then it will just be hanging around.
// app.use("/user",(req,res) => {
//     console.log("User middleware");
// })
 
// there can be multiple route handler..

// nrext is used to move to the next middleware
app.use("/user",(req,res, next) => {
    console.log("Handling the route user!!");
    // res.send("Response !!");
    next();

},
(req,res,next) => {
    console.log("Handling the route 1");
    // res.send("Response 1 !!");
    next();
},
(req,res) => {
    console.log("Handling the route 2");
    res.send("Response 2 !!");
}
)

app.use((req,res,next) => {
    console.log("Handling the route 1");
    // res.send("Response 1 !!");
    next();
    res.send("Response 1 !!"); //this will give an error as the response is alredy fullfiled
                              // by the next middleware and we arequired to send the response back
},
(req,res) => {
    console.log("Handling the route 2");
    res.send("Response 2 !!");
})


// you can also send the array of functions, it will work the same
app.use("/user",[(req,res, next) => {
    console.log("Handling the route user!!");
    // res.send("Response !!");
    next();

},
(req,res,next) => {
    console.log("Handling the route 1");
    // res.send("Response 1 !!");
    next();
},
(req,res) => {
    console.log("Handling the route 2");
    res.send("Response 2 !!");
}]
)

app.listen(3000, () => [ 
    console.log("Server is successfully listening on port 3000...")
]);