/* CONTROL ROUTES FOR SKILLS */

const asyncHandler = require('express-async-handler')
const Skill = require('../models/skillsModel')
const Job = require('../models/jobsModel')

// @desc    Get Skills for an authorized user
// @route   GET /api/skills
// @access  Private req.user retrieved from auth middleware
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({ user: req.user.id })
  res.status(200).json(skills)
})

// @desc    Get Skills Matched Job IDs for an authorized user
// @route   GET /api/skills/matches
// @access  Private req.user retrieved from auth middleware
const getSkillMatches = asyncHandler(async (req, res) => {
  const skills = await Skill.find({ user: req.user.id })
  const jobs = await Job.find({ user: req.user.id })

  // returns a JSON with the key the objectID for the skill
  // value is an array of matched jobIDs for that skill
  const matchedJobs = {}
  for (const i in skills) {
    matchedJobs[skills[i]._id] = []
    for (const j in jobs) {
      if ('jobSkills' in jobs[j]) {
        for (const k in jobs[j].jobSkills) {
          if (jobs[j].jobSkills[k].toLowerCase().includes(skills[i].skillName.toLowerCase())) {
            matchedJobs[skills[i]._id].push(jobs[j]._id)
          }
        }
      }
    }
  }
  res.status(200).json(matchedJobs)
})

// @desc    Create skill for an authorized user
// @route   POST /api/skills
// @access  Private req.user retrieved from auth middleware
const setSkill = asyncHandler(async (req, res) => {
  // validate required field is in body
  if (!req.body.skillName) {
    res.status(400)
    throw new Error('Please add a skillName. This is a required field')
  }

  const skill = await Skill.create({
    // required fields
    user: req.user.id,
    skillName: req.body.skillName,

    // optional field
    skillLevel: req.body.skillLevel

  })
  // respond with 200 and skill info
  res.status(200).json(skill)
})

// @desc    Update skill for an authorized user given skill id param
// @route   PUT /api/skills/:id
// @access  Private - req.user retrieved from auth middleware
const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id)

  // if skill not found - invalid id
  if (!skill) {
    res.status(400)
    throw new Error('Skill not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (skill.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body)

  // this will return 200 status and skill detail PRE update
  // use get method to get updated skill list for user
  res.status(200).json(updatedSkill)
})

// @desc    Delete skill for an authorized user given skill id param
// @route   DELETE /api/skills/:id
// @access  Private - req.user retrieved from auth middleware
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id)

  if (!skill) {
    res.status(400)
    throw new Error('Skill not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (skill.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await skill.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getSkills,
  setSkill,
  updateSkill,
  deleteSkill,
  getSkillMatches
}
