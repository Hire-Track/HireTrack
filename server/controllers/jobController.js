const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Job = require('../models/jobsModel')

// @desc    Get Jobs
// @route   GET /api/jobs
// @access  Private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user: req.user.id })
  res.status(200).json(jobs)
})

// @desc    Create job
// @route   POST /api/job
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

// // @desc    Update goal
// // @route   PUT /api/goals/:id
// // @access  Private
// const updateGoal = asyncHandler(async (req, res) => {
//   const goal = await Goal.findById(req.params.id)

//   if (!goal) {
//     res.status(400)
//     throw new Error('Goal not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   // Make sure the logged in user matches the goal user
//   if (goal.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
//     new: true
//   })

//   res.status(200).json(updatedGoal)
// })

// // @desc    Delete goal
// // @route   DELETE /api/goals/:id
// // @access  Private
// const deleteGoal = asyncHandler(async (req, res) => {
//   const goal = await Goal.findById(req.params.id)

//   if (!goal) {
//     res.status(400)
//     throw new Error('Goal not found')
//   }

//   // Check for user
//   if (!req.user) {
//     res.status(401)
//     throw new Error('User not found')
//   }

//   // Make sure the logged in user matches the goal user
//   if (goal.user.toString() !== req.user.id) {
//     res.status(401)
//     throw new Error('User not authorized')
//   }

//   await goal.remove()

//   res.status(200).json({ id: req.params.id })
// })

module.exports = {
  getJobs,
  setJob
}
