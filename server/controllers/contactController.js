const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactsModel')

// @desc    Get Contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user: req.user.id, job: req.body.jobID })
  res.status(200).json(contacts)
})

// @desc    Create contact
// @route   POST /api/contacts
// @access  Private
const setContact = asyncHandler(async (req, res) => {
  if (!req.body.jobID || !req.body.contactName) {
    res.status(400)
    throw new Error('Please add a jobID and contactName. These are required fields')
  }

  const contact = await Contact.create({
    // required fields
    user: req.user.id,
    job: req.body.jobID,
    contactName: req.body.contactName,

    // optional fields
    contactCompany: req.body.contactCompany,
    contactJobTitle: req.body.contactJobTitle,
    contactPhone: req.body.contactPhone,
    contactEmail: req.body.contactEmail

  })

  res.status(200).json(contact)
})

// @desc    Update contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)

  if (!contact) {
    res.status(400)
    throw new Error('Contact not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (contact.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body)

  // this will return 200 status and contact detail PRE update
  // use get method to get updated contact list for user
  res.status(200).json(updatedContact)
})

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)

  if (!contact) {
    res.status(400)
    throw new Error('Contact not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (contact.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await contact.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getContacts,
  setContact,
  updateContact,
  deleteContact
}
