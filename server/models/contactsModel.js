const mongoose = require('mongoose')

// schema for job contacts
const contactSchema = mongoose.Schema(
  {
    contact: { type: Object },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Job'
    },
    contactName: {
      type: String,
      required: [true, 'please add a name']
    },
    contactCompany: { type: String },
    contactJobTitle: { type: String },
    contactPhone: { type: String },
    contactEmail: { type: String }
  }
)

module.exports = mongoose.model('Contact', contactSchema)
