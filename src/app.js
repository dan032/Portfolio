const path = require('path');
const express = require("express");
const app = express();


app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) =>{
    res.send("index")
});

app.get("/projects", (req, res) =>{
    res.send("projects")
});

app.get("/resume", (req, res) =>{
    res.send("resume")
});

app.get("/site_plan", (req, res) =>{
    res.send("site_plan")
});


app.listen(8080, () => {
    console.log("Server started...")
});