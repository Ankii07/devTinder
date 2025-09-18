const jwt = require("jsonwebtoken");
const User = require("../Models/user");

// const adminAuth = (req, res, next) => {
//     console.log("Admin is getting checked !!");
//     const token = "xyz";
//     const isAdminAuthorized = token === "123";
//     if(!isAdminAuthorized) {
//         res.status(401).send("Unauthorized");
//     } else {
//         next();
//     }
// };

// const userAuth = (req, res, next) => {
//     console.log("User is getting checked !!");
//     const token = "xyz";
//     const isUserAuthorized = token === "123";
//     if(!isUserAuthorized) {
//         res.status(401).send("Unauthorized");
//     } else {
//         next();
//     }
// };

const userAuth = async (req, res, next) => {
    // Read the token from the cookies
    // validate the token..
    // find the user.. 

    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Token is not Valid !!!!");
        }
        // validate the token
        const decoded_Obj = await jwt.verify(token, "secret");
        const { _id } = decoded_Obj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User Not Found");
        }
        else {
            req.user = user;
            next();
        }

    } catch (err) {
        res.status(401).send("ERROR "+ err.message);
    }


}


// module.exports = { adminAuth, userAuth };
module.exports = { userAuth };
