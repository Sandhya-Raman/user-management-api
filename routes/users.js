
const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

// CREATE a new user
router.post("/", async (req, res) => {
    try {
        const { name, email, age } = req.body;

        const user = await User.create({
            name,
            email,
            age
        });

        res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid user data",
                error: error.message
            });
        }

        res.status(500).json({
            message: "Server error"
        });
    }
});

// READ all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

// READ a single user by ID
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

// UPDATE a user by ID
router.put("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const { name, email, age } = req.body;

        if (name === undefined && email === undefined && age === undefined) {
            return res.status(400).json({
                message: "Provide at least one field to update"
            });
        }

        const updates = {};

        if (name !== undefined) updates.name = name;
        if (email !== undefined) updates.email = email;
        if (age !== undefined) updates.age = age;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        if (error.name === "ValidationError" || error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid user data",
                error: error.message
            });
        }

        res.status(500).json({
            message: "Server error"
        });
    }
});

// DELETE a user by ID
router.delete("/:id", async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid user ID"
            });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;