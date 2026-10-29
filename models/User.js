
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Please enter a valid email address"
            ]
        },
        age: {
            type: Number,
            min: [1, "Age must be at least 1"],
            max: [120, "Age cannot exceed 120"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);