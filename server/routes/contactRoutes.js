const express = require('express')
const router = express.Router()
const {
  getContacts,
  setContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController.js')
const { protect } = require('../middleware/authMiddleware.js')

// get and create contacts
router.route('/').get(protect, getContacts).post(protect, setContact)
router.route('/:id').delete(protect, deleteContact).put(protect, updateContact)

module.exports = router
