import argon2 from 'argon2'
const sendEmail = require('./send-email')
const crypto = require('crypto');

export const ext = {
  argon2,
  sendEmail,
  crypto
}