const express = require("express");
const app = express();
const http = require("https");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors({
  origin:'*',
  methods: ["GET", "POST"],
}));

const server = http.createServer(app,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
}
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(process.env.PORT || 3001, () => {
  console.log("SERVER RUNNING");
});
