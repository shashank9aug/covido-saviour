const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');


const app = express()
// const {
//     userJoin,
//     getCurrentUser,
//     userLeave,
//     getRoomUsers
// } = require('./utils/user');

const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room) {
  return users.filter(user => user.room === room);
}


const server = http.createServer(app);
const io = socketio(server);

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room);
  
      socket.join(user.room);
  
      // Welcome current user
      socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
  
      // Broadcast when a user connects
      socket.broadcast
        .to(user.room)
        .emit(
          'message',
          formatMessage(botName, `${user.username} has joined the chat`)
        );
  
      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    });
  
    // Listen for chatMessage
    socket.on('chatMessage', msg => {
      const user = getCurrentUser(socket.id);
  
      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });
  
    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);
  
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username} has left the chat`)
        );
  
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });
      }
    });
});
  
// const PORT = process.env.PORT || 3000;
  
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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

app.get("/posts",(req,res)=>{
    res.render("posts")
})

app.get("/all",(req,res)=>{
    res.render("Allnews")
})



app.get("/posts_fun",(req,res)=>{
    res.render("posts_fun")
})
app.get("/chat",(req,res)=>{
    res.render("chat")
})

app.post("/chat",(req,res)=>{
    res.redirect("/messages")
})

app.get("/messages",(req,res)=>{
    res.render("messages")
})

app.get("/compose",(req,res)=>{
    res.render("compose")
})

app.listen(port,(req,res)=>{
    console.log("server started localhost:3000");
})