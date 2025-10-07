const moongoose = require("mongoose");

const connectionRequestSchema = new moongoose.Schema({
      
     fromUserId:{
        type: moongoose.Schema.Types.ObjectId,
        ref: "User", // reference to the user Collection
        required: true
     },
     toUserId:{
         type: moongoose.Schema.Types.ObjectId,
         ref: "User", // reference to the user Collection
         required: true
     },
     status:{
        type: String,
        required: true,
        // we use enum to restrict the values of a field
        enum: {
             values: ["ignore","interested","accepted","rejected"],
             message: `{VALUE} is incorrect status type`
        }
     }

},{timestamps:true});

// here we are creating an index on fromUserId and toUserId to make the search faster
// this is called compound index
// connectionRequestSchema.index({fromUserId:1, toUserId:1}, {unique:true}); 
// creating an index on fromUserId to make the search faster
connectionRequestSchema.index({fromUserId:1}); 

// middleware
// this middleware will run before saving the document
connectionRequestSchema.pre("save", function(next){
     const connectionRequest = this;
      // check if the fromUserId and toUserId are same
      if(connectionRequest.fromUserId.toString() === connectionRequest.toUserId.toString()){
        throw new Error("You cannot send a connection request to yourself");

      }
      // always call next() to proceed to the next middleware or to save the document
      next();
})

// creating a model
const ConnectionRequest = new moongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;