/* CONTROL ROUTES FOR USERS */

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const transporter = require('../utils/sendMail')
const crypto = require('crypto')

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
    transporter.sendMail({
      to: user.email,
      from: 'hiretrackwebapp@gmail.com',
      subject: 'signup success',
      html: '<h1> Welcome to HireTrack, you have registered successfully!</h1>'
    })
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

// @desc    Send password reset email for user
// @route   POST /api/users/reset-password
// @access  Public
const sendResetPassword = asyncHandler(async (req, res) => {
  // generate reset token
  const token = await crypto.randomBytes(32).toString('hex')

  // find user
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    res.status(401)
    throw new Error('User does not exist with that email')
  }

  // set tokens
  user.resetToken = token
  user.expireToken = Date.now() + 3600000 // reset token expires after 1 hour
  user.save()

  // send mail
  transporter.sendMail({
    to: user.email,
    from: 'hiretrackwebapp@gmail.com',
    subject: 'password reset',
    html: `
              <p>You requested a password reset for your HireTrack Account</p>
              <h2>click on this <a href="http://localhost:3000/users/reset/${token}">link</a> to reset password</h2>
              `
  })
  res.status(201).json({ message: 'Check your email' })
})

// @desc    Reset user password
// @route   PUT /api/users/reset/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  // Check for user
  const user = await User.findOne({ resetToken: req.params.token })
  if (!user) {
    res.status(401)
    throw new Error('User not found with that reset token, invalid token')
  }

  // Check if token has expired
  const now = new Date()
  if (user.expireToken < Date.parse(now)) {
    res.status(401)
    throw new Error('Sorry this token has expired, please request a new link')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const newHashedPassword = await bcrypt.hash(req.body.password, salt)

  // store new password
  const updatedUser = await User.findByIdAndUpdate(user.id, { password: newHashedPassword })

  // return 200 and updatedUser
  res.status(200).json(`The user with the email ${updatedUser.email} password has been reset`)
})

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getMe,
  sendResetPassword,
  resetPassword
}
