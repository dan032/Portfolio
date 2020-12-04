const path = require('path');
const express = require("express");
const enforce = require('express-sslify');

const app = express();
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Routes

app.get("/", (req, res) =>{
    res.send("index")
});

app.get("/projects", (req, res) =>{
    res.send("projects")
});

app.get("/resume", (req, res) =>{
    res.send("resume")
});

app.get("*", (req, res) => {
    res.redirect("index.html");
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server started...")
});
