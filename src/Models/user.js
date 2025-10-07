const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            index: true,
            // minLength: 4 means that the length of the first name should be at least 4
            minLength: 4,
            // maxLength: 20 means that the length of the first name should be between 4 and 20
            maxLength: 20,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            // indexing is a way to improve the performance of the database
            // whenever we are searching for a user by email it will be faster
            // if it is unique then it is by default indexed
            // unique: true means that the email should be unique
            unique: true,
            // lowercase: true means that the email should be lowercase
            lowercase: true,
            // trim: true means that the email should be trimmed
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }

            }
        },
        password: {
            type: String,
            required: true,

        },
        age: {
            type: Number,
            min: 18,
            max: 50,
        },
        gender: {
            type: String,
            enum:{
               values: ["male", "female", "other"],
                message: `{VALUE} is not supported`
            },
            /**
             * Validate the gender field
             * @param {string} value - the value of the gender field
             * @throws {Error} - if the value is not valid
             */
            validate(value) {
                // Check if the value is not equal to "male", "female" or "other"
                if (value !== "male" && value !== "female" && value !== "other") {
                    // Throw an error if the value is not valid
                    throw new Error("Gender should be male, female or other");
                }
            }
        },
        photoUrl: {
            type: String,
            default: "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_incoming&w=740&q=80",
            validate(value) {
                if (!validator.isURL(value)) {
                    throw new Error("Email is invalid");
                }
            }

        },
        about: {
            type: String,
            default: "This is the about section of the user"
        },
        skills: {
            // array of strings i.e. Skills of the user
            type: [String],
        }
        // createdAt: {
        //     type: Date,
        //     default: Date.now
        // },
        // updatedAt: {
        //     type: Date,
        //     default: Date.now
        // },
        // created_at: {
        //     type: Date,
        //     default: Date.now
        // },
        // updated_at: {
        //     type: Date,
        //     default: Date.now
        // }
    }, {
    timestamps: true
});

userSchema.index({firstName: 1, lastName: 1});

// this doesn't work in arrow functions
userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({
        // email: user.email,
        _id: user._id
    }, "secret", { expiresIn: "1h" });

    return token;
}
// userschema methods is used to add methods to the schema and offload the logic from the controller
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const isPassWord = await bcrypt.compare(passwordInputByUser, user.password);
    return isPassWord;
}

const User = mongoose.model("User", userSchema);

module.exports = User;