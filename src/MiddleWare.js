// const express = require("express");
// // 
// // app 
// const app = express();

// // if we will not send the request back to the client then it will just be hanging around.
// // app.use("/user",(req,res) => {
// //     console.log("User middleware");
// // })

// // app.use("/user", rh, [rh1, rh2], rh3, rh4);
 
// // there can be multiple route handler..

// // nrext is used to move to the next middleware
// app.use("/user",(req,res, next) => {
//     console.log("Handling the route user!!");
//     // res.send("Response !!");
//     next();

// },
// (req,res,next) => {
//     console.log("Handling the route 1");
//     // res.send("Response 1 !!");
//     next();
// },
// (req,res) => {
//     console.log("Handling the route 2");
//     res.send("Response 2 !!");
// }
// )

// app.use((req,res,next) => {
//     console.log("Handling the route 1");
//     // res.send("Response 1 !!");
//     next();
//     res.send("Response 1 !!"); //this will give an error as the response is alredy fullfiled
//                               // by the next middleware and we arequired to send the response back
// },
// (req,res) => {
//     console.log("Handling the route 2");
//     res.send("Response 2 !!");
// })


// // you can also send the array of functions, it will work the same
// app.use("/user",[(req,res, next) => {
//     console.log("Handling the route user!!");
//     // res.send("Response !!");
//     next();

// },
// (req,res,next) => {
//     console.log("Handling the route 1");
//     // res.send("Response 1 !!");
//     next();
// },
// (req,res) => {
//     console.log("Handling the route 2");
//     res.send("Response 2 !!");
// }]
// )

// app.listen(3000, () => [ 
//     console.log("Server is successfully listening on port 3000...")
// ]);

const express = require("express");
// app 
const app = express();

// const {adminAuth, userAuth} = require("./Middlewares/auth");

// // GET /user => it will check all the app.xxx("matching route") functions
//          //  => middleware chain => request handler 

// // app.use("/",(req,res,next) => {
// //     // console.log("Handling the route user!!");
// //     // res.send("Response !!");
// //     next();
// // });

// // Handle Auth Middleware for all GET, POST, ... requests
// // first this will run and then the next routes will run , so we need not to do it for all the routes separately..
// // app.use("/admin", (req, res, next) => {
// //     const token = "adfdsffdsfdsf";
// //     let isAdminAuthorized = token = "xyz";
// //     if(!isAdminAuthorized){
// //         res.status(401).send("Unathorized request");
// //     }else{
// //         next();
// //     }
// // });
// app.use("/admin", adminAuth);
// // app.use("/user", userAuth);

// // app.get(
// //     "/user",
// //     (req, res, next) => {
// //         console.log("Handling /user route");
// //         next();
// //     },
// //     (req,res, next) => {
// //         next();
// //     },
// //     (req,res,next) => {
// //         console.log("Handling the route 2");
// //         res.send("Response 2 !!");
// //     }
// // )

// app.get("/user",userAuth,(req,res) => {
//     res.send("user Data sent");
// });

// app.get("/admin/getAllData",(req,res) => {
//     // Logic of fetching all the data
//     // Logic to check if the request is authorized
//     // const token = req.body?.token;
//     // const token = "2e3e324"
//     // const isAdminAuthorized = token === "123";

//     // // console.log("Fetching all the data");
//     // // res.send("All Data Sent");

//     // if(isAdminAuthorized) {
//     //     res.send("All Data Sent");
//     // } else {
//     //     res.status(401).send("Unauthorized");
//     // }

// })

// app.get("/admin/DeleteUser",(req,res) => {
//     // Logic to check if the request is authorized
//     // Logic of deleting the user
//     console.log("Deleting the user");
//     res.send("User Deleted Successfully");
// })

app.get("/getUserData", (req, res) => {
    // always try to write your logic in try and catch block..
    try{

    }
    catch(err){

    }
    // Logic of DB call and get user data
    throw new Error("dvbsdef");
    res.send("User Data Sent");
})

// it matches all your routes
// err must be your first parameter..
// order of parameters matters..
app.use("/",(err,req,res,next) => {
    
    if(err){
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => [ 
    console.log("Server is successfully listening on port 3000...")
]);