const validator = require("validator");

// validating the sign up data
const validateSignUpData = (req) => {
    // take out all the requirements..
    // destructuring the required data from the request body
    const  {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(firstName.length < 4 || firstName.length > 50){
        throw new Error("firstName should be between 4 and 50 characters");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
};

module.exports = {
    validateSignUpData,
};