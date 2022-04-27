const express = require('express')
const router = express.Router()
const {
  getSkills,
  setSkill,
  updateSkill,
  deleteSkill
} = require('../controllers/skillController.js')
const { protect } = require('../middleware/authMiddleware.js')

// get and create skills
router.route('/').get(protect, getSkills).post(protect, setSkill)
router.route('/:id').delete(protect, deleteSkill).put(protect, updateSkill)

module.exports = router
