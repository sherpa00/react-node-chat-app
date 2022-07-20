const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const cors = require("cors");

app.use(cors());

const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
});


io.on("connection",(socket) => {

    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room",(data) => {
        console.log("a user joined");
        socket.join(data);
    });

    socket.on("send_message",(data) => {
        console.log(data);
        console.log("sending message");
        socket.to(data.room).emit("get message",data);
    });
});

server.listen(3001,() => {
    console.log("Server is running on port 3001...");
});

