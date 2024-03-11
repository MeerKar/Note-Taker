const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");

// Import routes
const htmlRoutes = require("./routes/index");
const apiRoutes = require("./routes/notes");

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from the public folder

// Use routes
app.use("/", htmlRoutes);
app.use("/api", apiRoutes);
// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
