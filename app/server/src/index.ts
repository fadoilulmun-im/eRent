import argon2 from 'argon2'
const sendEmail = require('./send-email')
const crypto = require('crypto');
const fs = require('fs');
const path = require("path");
const pump = require("pump")
const socketio = require('./socketio')

export const ext = {
  argon2,
  sendEmail,
  crypto,
  fs,
  path,
  pump,
  socketio
}