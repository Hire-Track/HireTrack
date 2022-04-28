const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  updateUser
} = require('../controllers/userController.js')
const { protect } = require('../middleware/authMiddleware.js')
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - userName
 *         - password
 *       properties:
 *         _id:
 *           type: String
 *           description: User's auto-generated unique mongoDB id
 *         email:
 *           type: String
 *           description: User's unique email
 *         userName:
 *           type: String
 *           description: User's unique username
 *         password:
 *           type: String
 *           description: User's encrypted password
 *         gradDate:
 *           type: Date
 *           description: User's optional graduation date
 *         realName:
 *           type: String
 *           description: User's optional realName
 */

/**
  * @swagger
  * tags:
  *   name: Users
  *   description: The user managing API
  */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registers A New User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - userName
 *               - password
 *             properties:
 *               email:
 *                  type: String
 *                  description: User's unique email
 *               userName:
 *                  type: String
 *                  description: User's unique username
 *               password:
 *                  type: String
 *                  description: User's password
 *               gradDate:
 *                  type: Date
 *                  description: User's optional graduation date
 *               realName:
 *                  type: String
 *                  description: User's optional realName
 *     responses:
 *       201:
 *         description: Successfully added User's credentials - Store bearer auth in LOCALSTORAGE
 *       400:
 *         description: Invalid Credentials
 *       409:
 *         description: User Already Exists
 */
// register
router.post('/register', registerUser)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                  type: String
 *                  description: User's unique email
 *               password:
 *                  type: String
 *                  description: User's password
 *     responses:
 *       201:
 *         description: Successfully retreived User's credentials - Store bearer auth in LOCALSTORAGE
 *       400:
 *         description: Invalid Credentials
 */
// login
router.post('/login', loginUser)

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get's current user information - Need Auth
 *     tags: [Users]
 *     security:
 *       - BearerAuth: [read]
 *     responses:
 *       200:
 *         description: User's basic information - excluding password
 *       401:
 *         description: Not Authorized
 */
// get all info
router.get('/me', protect, getMe)

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Update user's information (gradDate or realName ) - Need Auth
 *     tags: [Users]
 *     security:
 *       - BearerAuth: [read]
 *     requestBody:
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               gradDate:
 *                  type: Date
 *                  description: User's optional graduation date
 *               realName:
 *                  type: String
 *                  description: User's optional realName
 *     responses:
 *       200:
 *         description: User's basic information - excluding password
 *       401:
 *         description: Not Authorized
 */
// update info
router.put('/me', protect, updateUser)

module.exports = router
