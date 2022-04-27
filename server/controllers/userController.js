/* CONTROL ROUTES FOR USERS */

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // check for user email in db
  const user = await User.findOne({ email })

  // check credentials and decrypt stored pass
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user.id) // response token to be stored into local storage
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data for an authorized user
// @route   GET /api/users/me
// @access  Private - req.user retreived from auth middleware
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, gradDate, realName } = req.body

  // check for required fields
  if (!userName || !email || !password) {
    res.status(400)
    throw new Error('Please add username, email, and password fields')
  }

  // check if user exits
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(409)
    throw new Error('User already Exits')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // create user
  const user = await User.create({
    userName,
    email,
    password: hashedPassword,
    gradDate,
    realName
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      userName: user.userName,
      email: user.email,
      token: generateToken(user.id) // response token to be stored into local storage
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Update user
// @route   PUT /api/users/me
// @access  Private - req.user retreived from auth middleware
const updateUser = asyncHandler(async (req, res) => {
  Object.assign(req.user, req.body)
  await req.user.save(function (err, results) {
    if (err) {
      res.status(400)
      console.log(err)
      throw new Error('Invalid Update')
    } else {
      res.status(201).json(results)
      console.log('Updated User: ', results.email, results.userName)
    }
  })
})

// Generate JWT (used in login and register)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getMe
}
