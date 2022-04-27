const asyncHandler = require('express-async-handler')
const Job = require('../models/jobsModel')

// @desc    Get Jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user: req.user.id })
  res.status(200).json(jobs)
})

// @desc    Create job
// @route   POST /api/jobs
// @access  Private
const setJob = asyncHandler(async (req, res) => {
  if (!req.body.jobTitle || !req.body.jobCompany || !req.body.jobType) {
    res.status(400)
    throw new Error('Please add a jobTitle, jobCompany, and jobType. These are required fields')
  }

  const job = await Job.create({
    // required fields
    user: req.user.id,
    jobTitle: req.body.jobTitle,
    jobCompany: req.body.jobCompany,
    jobType: req.body.jobType,

    // optional fields
    appLink: req.body.appLink,
    jobSkills: req.body.jobSkills,
    jobBenefits: req.body.jobBenefits,
    dateApplied: req.body.dateApplied,
    dateResponse: req.body.dateResponse,
    dateInterview: req.body.dateInterview,
    dateOffer: req.body.dateOffer,
    appStatus: req.body.appStatus,
    nextSteps: req.body.nextSteps,
    decision: req.body.decision
  })

  res.status(200).json(job)
})

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)

  if (!job) {
    res.status(400)
    throw new Error('Job not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body)

  // this will return 200 status and job detail PRE update
  // use get method to get updated job list for user
  res.status(200).json(updatedJob)
})

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)

  if (!job) {
    res.status(400)
    throw new Error('Job not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await job.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob
}
