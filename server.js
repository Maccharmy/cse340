import express from "express";

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
app.get("/organizations", (req, res) => {
    res.render("organizations", { title: "Organizations" });
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
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});