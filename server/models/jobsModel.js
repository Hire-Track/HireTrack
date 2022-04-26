const mongoose = require('mongoose')

// schema for jobs
const jobSchema = mongoose.Schema(
  {
    job: { type: Object },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    jobTitle: {
      type: String,
      required: [true, 'please add a title']
    },
    jobCompany: {
      type: String,
      required: [true, 'please add a company']
    },
    appLink: { type: String },
    jobType: {
      type: String,
      enum: ['FULLTIME', 'INTERNSHIP'],
      required: [true, 'please add if this is a fulltime or internship']
    },
    jobSkills: { type: [String] },
    jobBenefits: { type: [String] },
    dateApplied: { type: Date },
    dateResponse: { type: Date },
    dateInterview: { type: Date },
    dateOffer: { type: Date },
    appStatus: {
      type: String,
      enum: ['APPLIED', 'WAITING', 'INTERVIEW SCHEDULED', 'INTERVIEW DONE']
    },
    nextSteps: { type: String },
    decision: { type: String }
  })

module.exports = mongoose.model('Job', jobSchema)
