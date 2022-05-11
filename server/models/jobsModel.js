const mongoose = require('mongoose')
const validator = require('validator')

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
    jobLocation: { type: String },
    jobDescription: { type: String },
    dateApplied: {
      type: Date,
      validate: [validator.isDate, 'invalid Date format']
    },
    dateResponse: {
      type: Date,
      validate: [validator.isDate, 'invalid Date format']
    },
    dateInterview: {
      type: Date,
      validate: [validator.isDate, 'invalid Date format']
    },
    dateOffer: {
      type: Date,
      validate: [validator.isDate, 'invalid Date format']
    },
    appStatus: {
      type: String,
      enum: ['APPLIED', 'WAITING', 'INTERVIEW SCHEDULED', 'INTERVIEW DONE']
    },
    nextSteps: { type: String },
    decision: { type: String }
  })

module.exports = mongoose.model('Job', jobSchema)
