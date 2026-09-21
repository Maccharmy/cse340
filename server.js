import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the public folder
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

// Organizations route
app.get("/organizations", async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = "Our Partner Organizations";

    // Pass both title and organizations to the template
    res.render("organizations", { title, organizations });
});

// Projects route
app.get("/projects", (req, res) => {
    res.render("projects", { title: "Service Projects" });
});

// Categories route
app.get("/categories", (req, res) => {
    res.render("categories", { title: "Service Project Categories" });
});

// Start server
app.listen(port, async () => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${port}`);
        console.log(`Environment: ${process.env.NODE_ENV}`);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
});
