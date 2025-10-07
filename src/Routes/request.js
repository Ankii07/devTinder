const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../Models/ConnectionRequest");
const User = require("../Models/user");

// requestRouter.post("/sendConnectionRequest",userAuth, async(req,res) => {
//     const user = req.user;
//     // sending a connection request
//     console.log("Sending a connection request");

//     res.send(user.firstName + " sent the connect request!");
// })

requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId =req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignore","interested"];
        if(!allowedStatus.includes(status)){
              return res.status(400).json({message: "Invalid status type" + status});
        }

        // check wether the user exists or not
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message: "User not found"});
        }

        // IF there is an existing connection request from the same user to the same user then we will update the status of that request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            // $or will match any one of the conditions
            $or:[
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        });

        if(existingConnectionRequest){
            return res .status(400).json({message: "Connection Request already exists"});
        }
        // creating a new connection request
        const ConnectionRequests = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        
        // saving the connection request
        const data = await ConnectionRequests.save();
        res.json({
            message: req.user.firstName + "is now " + status + " to connect with " + toUser.firstName,
            data,
        });
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }

})

// POST VS GET - Thought process
requestRouter.post("/request/review/:status/:requestId",userAuth, async(req,res) =>{
    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;
        // validate the status
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message: "Status not Allowed"});
        }
        // validate the requestId
        // Akshya ==> elon
        // loggedInUser ==> toUserId
        // status ==> interested
        // request Id should be valid\

        // find the connection request
         const connectionRequest = await ConnectionRequest.findOne({
              _id: requestId,
              toUserId: loggedInUser._id,
              status: "interested",
         });

        //  if connection request is not found
         if(!connectionRequest){
            return res.status(404).json({
                message: "Connection Request not found",
            })
         }
        // update the status of the connection request
         connectionRequest.status = status;
        
         const data = await connectionRequest.save();
         res.json({message: "Connection Request " + status, data});

    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }

})

module.exports = requestRouter;