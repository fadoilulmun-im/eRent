import argon2 from 'argon2'
const sendEmail = require('./send-email')
const crypto = require('crypto');
const fs = require('fs');
const path = require("path");
const pump = require("pump");

import { Server } from "socket.io";

const io = new Server();

console.log("frrrrrdd")
io.on("connection", (socket) => {

  socket.on("admin", (e) => {
    if (e.time) {
      let tim = e.time - new Date().getTime();

      // console.log(e);
      // console.log(tim);
      setTimeout(() => {
        io.emit(e.event + "_" + e.user_id, e.data);
      }, tim, "data")

    }
  })

  socket.on("cobak",(e)=>{
    console.log("dapat data dari client ",e)
  })

  console.log(socket.id);
});

io.listen(3333)


export const ext = {
  argon2,
  sendEmail,
  crypto,
  fs,
  path,
  pump,
  
}