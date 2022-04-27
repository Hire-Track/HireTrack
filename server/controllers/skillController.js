const asyncHandler = require('express-async-handler')
const Skill = require('../models/skillsModel')

// @desc    Get Skills
// @route   GET /api/skills
// @access  Private
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({ user: req.user.id })
  res.status(200).json(skills)
})

// @desc    Create skill
// @route   POST /api/skills
// @access  Private
const setSkill = asyncHandler(async (req, res) => {
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

  res.status(200).json(skill)
})

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = asyncHandler(async (req, res) => {
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

  const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body)

  // this will return 200 status and skill detail PRE update
  // use get method to get updated skill list for user
  res.status(200).json(updatedSkill)
})

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
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
  deleteSkill
}
