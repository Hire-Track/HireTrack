/* eslint-disable no-unused-vars */
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000 // env port or use defualt 5000

// connect to DB
connectDB()

// serve express app
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// serve user api to client side
app.use('/api/users', require('./routes/userRoutes'))

// use custom errorhandler middleware (see middleware folder)
app.use(errorHandler)

// serve api
app.listen(port, () => console.log(`Server started on port ${port}`))
