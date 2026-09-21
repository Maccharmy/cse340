import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

app.get("/organizations", async (req, res) => {
    const organizations = await getAllOrganizations();
    res.render("organizations", { title: "Our Partner Organizations", organizations });
});

app.get("/projects", async (req, res) => {
    try {
        const projects = await getAllProjects();
        console.log("Projects retrieved:", projects);
        res.render("projects", { title: "Service Projects", projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).send("Unable to load projects at this time.");
    }
});

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
