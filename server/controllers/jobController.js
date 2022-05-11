/* CONTROL ROUTES FOR JOBS */

const asyncHandler = require('express-async-handler')
const Job = require('../models/jobsModel')

// @desc    Get Jobs for an authorized user
// @route   GET /api/jobs
// @access  Private - req.user retreived from auth middleware
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user: req.user.id })
  res.status(200).json(jobs)
})

// @desc    Create job for an authorized user
// @route   POST /api/jobs
// @access  Private - req.user retreived from auth middleware
const setJob = asyncHandler(async (req, res) => {
  // validate required fields are in body
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
    jobLocation: req.body.jobLocation,
    jobDescription: req.body.jobDescription,
    dateApplied: req.body.dateApplied,
    dateResponse: req.body.dateResponse,
    dateInterview: req.body.dateInterview,
    dateOffer: req.body.dateOffer,
    appStatus: req.body.appStatus,
    nextSteps: req.body.nextSteps,
    decision: req.body.decision
  })
  // respond with 200 and job info
  res.status(200).json(job)
})

// @desc    Update job for an authorized user given job id param
// @route   PUT /api/jobs/:id
// @access  Private - req.user retreived from auth middleware
const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)

  // if job not found - invalid id
  if (!job) {
    res.status(400)
    throw new Error('Job not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the job user
  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body)

  // this will return 200 status and job detail PRE update
  // use get method to get updated job list for user
  res.status(200).json(updatedJob)
})

// @desc    Delete job for an authorized user given job id param
// @route   DELETE /api/jobs/:id
// @access  Private - req.user retreived from auth middleware
const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)

  // if job not found - invalid id
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

  // respond with 200 and job id
  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob
}
