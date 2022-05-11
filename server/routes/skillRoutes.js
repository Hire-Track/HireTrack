const express = require('express')
const router = express.Router()
const {
  getSkills,
  setSkill,
  updateSkill,
  deleteSkill,
  getSkillMatches
} = require('../controllers/skillController.js')
const { protect } = require('../middleware/authMiddleware.js')
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Skills:
 *       type: object
 *       required:
 *         - skillName
 *         - user
 *       properties:
 *         _id:
 *           type: String
 *           description: Skill's auto-generated unique mongoDB id
 *         user:
 *           type: String
 *           description: Unique user id of user creating this skill
 *         skillName:
 *           type: String
 *           description: Name of the User's skill
 *         skillLevel:
 *           type: String
 *           description: BEGINNER, INTERMEDIATE, or ADVANCED
 */

/**
  * @swagger
  * tags:
  *   name: Skills
  *   description: The skill managing API
  */

/**
 * @swagger
 * /skills:
 *   get:
 *     summary: Get all current user's skills - Need Auth
 *     tags: [Skills]
 *     security:
 *       - BearerAuth: [read]
 *     responses:
 *       200:
 *         description: Success - all User's skills in JSON Format
 *       401:
 *         description: Not Authorized
 */
/**
 * @swagger
 * /skills:
 *   post:
 *     summary: Create a user skill - Need Auth
 *     tags: [Skills]
 *     security:
 *       - BearerAuth: [read]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - skillName
 *             properties:
 *               skillName:
 *                 type: String
 *                 description: Name of the User's skill
 *               skillLevel:
 *                 type: String
 *                 description: BEGINNER, INTERMEDIATE, or ADVANCED
 *     responses:
 *       200:
 *         description: Successfully added new skill
 *       400:
 *         description: One of the required fields was not submitted
 *       401:
 *         description: Not Authorized
 */

// get and create skills
router.route('/').get(protect, getSkills).post(protect, setSkill)

/**
* @swagger
* /skills/{skillID}:
*   put:
*     summary: Update a skill by ID - Need Auth
*     tags: [Skills]
*     security:
*       - BearerAuth: [read]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: String
*         required: true
*         description: MongoDB ID of the skill to update
*     requestBody:
*       required: true
*       content:
*         application/x-www-form-urlencoded:
*           schema:
*             type: object
*             properties:
*               skillName:
*                 type: String
*                 description: Name of the User's skill
*               skillLevel:
*                 type: String
*                 description: BEGINNER, INTERMEDIATE, or ADVANCED
*     responses:
*       200:
*         description: Successfully updated skill
*       400:
*         description: Skill not found - Skill ID invalid
*       401:
*         description: Not Authorized
*/

/**
* @swagger
* /skills/{skillID}:
*   delete:
*     summary: Delete a skill by ID - Need Auth
*     tags: [Skills]
*     security:
*       - BearerAuth: [read]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: String
*         required: true
*         description: MongoDB ID of the skill to delete
*     responses:
*       200:
*         description: Successfully deleted skill
*       400:
*         description: Skill not found - Skill ID invalid
*       401:
*         description: Not Authorized
*/

/**
* @swagger
* /skills/matches:
*   get:
*     summary: Get job id matches for all user skills - Need Auth
*     tags: [Skills]
*     security:
*       - BearerAuth: [read]
*     responses:
*       200:
*         description: Success - JSON, keys are skill ID, values are arrays of matched jobIDs
*       401:
*         description: Not Authorized
*/

// update aand delete skills
router.route('/:id').delete(protect, deleteSkill).put(protect, updateSkill)

// get skill matches
router.route('/matches').get(protect, getSkillMatches)

module.exports = router
