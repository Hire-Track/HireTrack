const express = require('express')
const router = express.Router()
const {
  getJobs,
  setJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController.js')
const { protect } = require('../middleware/authMiddleware.js')

// get and create jobs
router.route('/').get(protect, getJobs).post(protect, setJob)
router.route('/:id').delete(protect, deleteJob).put(protect, updateJob)

module.exports = router
