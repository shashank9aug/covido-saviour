const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")

const app = express()

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


const mongoose = require("mongoose")
const urldb = MONGODB_LINK
mongoose.connect(urldb,{useNewUrlParser:true,useUnifiedTopology: true });
mongoose.set("useCreateIndex",true);

const postSchema ={
    userName:String,
    postTitle:String,
    postDate:String,
    postDescription:String,
    pinCode:Number
};

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    posts:[postSchema]
});

const User=new mongoose.model("User",userSchema);

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

app.get("/posts",(req,res)=>{
    res.render("posts")
})

app.get("/posts_fun",(req,res)=>{
    res.render("posts_fun")
})

app.get("/compose",(req,res)=>{
    res.render("compose")
})

app.listen(port,(req,res)=>{
    console.log("server started localhost:3000");
})