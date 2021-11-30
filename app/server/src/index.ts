import argon2 from 'argon2'
const sendEmail = require('./send-email')
const crypto = require('crypto');
const fs = require('fs');
const path = require("path");
const pump = require("pump");
const nowLocal = require("./function")

// socket untuk client di api (ilul)
import { io } from "socket.io-client";
// const socket = io("http://127.0.0.1:3333"); // for local
const socket = io("http://e.plansys.co:3333"); // for host


import { Server } from "socket.io";

const ioServer = new Server();

ioServer.on("connection", (socket) => {

  socket.on("admin", (e) => {
    if (e.time) {
      let tim = e.time - new Date().getTime();

      // console.log(e);
      // console.log(tim);
      setTimeout(() => {
        ioServer.emit(e.event + "_" + e.user_id, e.data);
        // console.log('with time:', e.data);
      }, tim, "data")

    }else{
      ioServer.emit(e.event + "_" + e.user_id, e.data);
    }
    console.log(e);
  })

  socket.on("cobak",(e)=>{
    console.log("dapat data dari client ",e)
  })

  // console.log(socket.id);
});

ioServer.listen(3333)


export const ext = {
  argon2,
  sendEmail,
  crypto,
  fs,
  path, 
  pump,
  socket,
  nowLocal
}