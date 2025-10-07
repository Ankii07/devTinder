const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Token is not valid!" });
        }
        
        // Validate the token
        const decoded_Obj = jwt.verify(token, "secret");
        const { _id } = decoded_Obj;
        
        // Find the user
        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        req.user = user;
        next(); // Proceed to the next middleware/route handler

    } catch (err) {
        res.status(401).json({ message: "Authentication error: " + err.message });
    }
};

module.exports = { userAuth };