const mongoose = require('mongoose')

// schema for skills
const skillSchema = mongoose.Schema(
  {
    skill: { type: Object },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    skillName: {
      type: String,
      required: [true, 'please enter a skill name']
    },
    skillLevel: {
      type: String,
      enum: ['APPLIED', 'WAITING', 'INTERVIEW SCHEDULED', 'INTERVIEW DONE']
    }
  }
)

module.exports = mongoose.model('Skill', skillSchema)
