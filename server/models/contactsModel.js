const mongoose = require('mongoose')
const validator = require('validator')

// schema for job contacts
const contactSchema = mongoose.Schema(
  {
    contact: { type: Object },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Job'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    contactName: {
      type: String,
      required: [true, 'please add a name']
    },
    contactCompany: { type: String },
    contactJobTitle: { type: String },
    contactPhone: {
      type: String,
      // eslint-disable-next-line no-useless-escape
      match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, 'please enter a valid phone number']
    },
    contactEmail: {
      type: String,
      validate: [validator.isEmail, 'invalid email']
    }
  }
)

module.exports = mongoose.model('Contact', contactSchema)
