const mongoose = require('mongoose')
const validator = require('validator')

// schema for users
const userSchema = mongoose.Schema({
  user: { type: Object },
  email: {
    type: String,
    required: [true, 'please add an email'],
    unique: true,
    validate: [validator.isEmail, 'invalid email']
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
  gradDate: {
    type: Date,
    validate: [validator.isDate, 'invalid Date format']
  },
  realName: { type: String }
})

module.exports = mongoose.model('User', userSchema)
