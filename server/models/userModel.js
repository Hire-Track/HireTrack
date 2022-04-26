const mongoose = require('mongoose')

// schema for users
const userSchema = mongoose.Schema({
  user: { type: Object },
  email: {
    type: String,
    required: [true, 'please add an email'],
    unique: true
  },
  userName: {
    type: String,
    required: [true, 'please add a username'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'please add a password']
  },
  gradDate: { type: Date },
  realName: { type: String }
})

module.exports = mongoose.model('User', userSchema)
