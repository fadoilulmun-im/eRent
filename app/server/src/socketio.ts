import { Server } from "socket.io";

const io = new Server(3333);

io.on("connection", (socket) => {
  console.log('connect')
  socket.emit("hello", "world");

});