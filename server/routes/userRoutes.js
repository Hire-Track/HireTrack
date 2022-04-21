const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware.js')

// register
router.post('/register', registerUser)

//login
router.post('/login', loginUser)

//get all info
router.get('/me', protect, getMe)


module.exports = router