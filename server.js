import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';  // ✅ corrected import

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
    res.render("organizations", { title, organizations });
});

// Projects route
app.get("/projects", async (req, res) => {
    try {
        const projects = await getAllProjects();

        // ✅ Log results to console to verify query works
        console.log("Projects retrieved:", projects);

        res.render("projects", { title: "Service Projects", projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).send("Unable to load projects at this time.");
    }
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
