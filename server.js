
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());

// Import user routes
const userRoutes = require("./routes/users");

// Welcome route
app.get("/", (req, res) => {
    res.send("User Management REST API is running!");
});

// User management routes
app.use("/api/users", userRoutes);

// Start server and connect to MongoDB
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });
    