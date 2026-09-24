import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static("public"));

// ✅ Middleware to log all incoming requests
app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next();
});

// ✅ Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = process.env.NODE_ENV;
    next();
});

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

app.get("/categories", async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.render("categories", { title: "Service Project Categories", categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).send("Unable to load categories at this time.");
    }
});

// ✅ Global error handler middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).send("Something went wrong!");
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
