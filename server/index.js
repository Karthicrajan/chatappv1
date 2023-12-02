const express = require('express');
const mongoose = require('mongoose');
const user = require("./routes/user");
const chatroute = require("./routes/chatroute");
const messageroute = require("./routes/message");
const cors = require('cors');
const { Server, Socket } = require('socket.io');
const app = express();
const {createServer} = require('node:http');
const server = app.listen(5000,()=>{
    console.log("server runing at port 5000");
})
  
  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // origin: "http://192.168.139.133:3000/",
      // credentials: true,
    },
  });
  io.on("connection",(socket) =>{
    
    socket.on("setup",(userData) =>{
      socket.join(userData._id);
      // console.log(userData._id);
      socket.emit("connected")
    })

    socket.on("joinRoom",(room) => {
    //  console.log("the room",room);
     socket.join(room);
    })
    socket.on("newMessage", (newMessageRecieved) => {
      var chat = newMessageRecieved;
      console.log("revec romm",chat);
       socket.to(newMessageRecieved).emit('recevedMessage');
    })
    // socket.on('disconnect', () => {
    //   console.log('User disconnected');
    // });
  })
app.use(cors());
mongoose.connect('mongodb+srv://karthicrajan:run1234@cluster0.pdy5q0o.mongodb.net/chatapp?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to db")).catch((err) => console.log(err));
app.use(express.json());
app.use("/api/auth",user);
app.use("/api/chat",chatroute);
app.use("/api/message",messageroute);
