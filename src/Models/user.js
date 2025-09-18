const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
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
            validate(value) {
                if (value !== "male" && value !== "female" && value !== "other") {
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

const User = mongoose.model("user", userSchema);

module.exports = User;