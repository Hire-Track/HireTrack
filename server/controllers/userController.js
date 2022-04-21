const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Authenticate new user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    //check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }

    res.json({message: 'Login User'})
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler( async (req, res) => {
    res.status(200).json(req.user)
})

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res) => {
    const { userName, email, password, gradDate, realName} = req.body
    
    if(!userName || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exits
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already Exits')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user =  await User.create({
        userName,
        email,
        password: hashedPassword,
        gradDate, 
        realName, 
    })



    if(user) {
        res.status(201).json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// Generate JWT (used in login and register)
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}