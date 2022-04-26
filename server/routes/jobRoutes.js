const express = require('express')
const router = express.Router()
const {
  getJobs,
  setJob
} = require('../controllers/jobController.js')
const { protect } = require('../middleware/authMiddleware.js')

// get and create jobs
router.route('/').get(protect, getJobs).post(protect, setJob)

module.exports = router
