const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")

const app = express()

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


const mongoose = require("mongoose")


const port=3000
app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.listen(port,(req,res)=>{
    console.log("server started localhost:3000");
})