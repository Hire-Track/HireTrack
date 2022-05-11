const express = require('express')
const router = express.Router()
const {
  getJobs,
  setJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController.js')
const { protect } = require('../middleware/authMiddleware.js')
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - jobTitle
 *         - jobCompany
 *         - jobType
 *         - user
 *       properties:
 *         _id:
 *           type: String
 *           description: Job's auto-generated unique mongoDB id
 *         user:
 *           type: String
 *           description: Unique user id of user creating this job
 *         jobTitle:
 *           type: String
 *           description: Job title of job
 *         jobCompany:
 *           type: String
 *           description: Company offering job
 *         jobType:
 *           type: String
 *           description: FULLTIME or INTERNSHIP
 *         appLink:
 *           type: String
 *           description: Link to application
 *         jobSkills:
 *           type: Array of Strings
 *           description: Skills listed for this job
 *         jobBenefits:
 *           type: Array of Strings
 *           description: Benefits listed for this job
 *         jobLocation:
 *           type: String
 *           description: location listed for this job
 *         dateApplied:
 *           type: Date
 *           description: Date applied to this job
 *         dateResponse:
 *           type: Date
 *           description: Date response recieved from this job
 *         dateInterview:
 *           type: Date
 *           description: Date of interview for this job
 *         dateOffer:
 *           type: Date
 *           description: Date of Offer  for this job
 *         appStatus:
 *           type: String
 *           description: APPLIED, WAITING, INTERVIEW SCHEDULED, or INTERVIEW DONE
 *         nextSteps:
 *           type: String
 *           description: next steps for this job
 *         decision:
 *           type: String
 *           description: decision made for this job
 */

/**
  * @swagger
  * tags:
  *   name: Jobs
  *   description: The job managing API
  */

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all current user's jobs - Need Auth
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: [read]
 *     responses:
 *       200:
 *         description: Success - all User's jobs in JSON Format
 *       401:
 *         description: Not Authorized
 */
/**
 * @swagger
 * /jobs:
 *   post:
 *     summary: Create a user job - Need Auth
 *     tags: [Jobs]
 *     security:
 *       - BearerAuth: [read]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - jobTitle
 *               - jobCompany
 *               - jobType
 *             properties:
 *               jobTitle:
 *                 type: String
 *                 description: Job title of job
 *               jobCompany:
 *                 type: String
 *                 description: Company offering job
 *               jobType:
 *                 type: String
 *                 description: FULLTIME or INTERNSHIP
 *               appLink:
 *                 type: String
 *                 description: Link to application
 *               jobSkills:
 *                 type: Array of Strings
 *                 description: Skills listed for this job
 *               jobBenefits:
 *                 type: Array of Strings
 *                 description: Benefits listed for this job
 *               jobLocation:
 *                 type: String
 *                 description: location listed for this job
 *               jobDescription:
 *                 type: String
 *                 description: Description for this job
 *               dateApplied:
 *                 type: Date
 *                 description: Date applied to this job
 *               dateResponse:
 *                 type: Date
 *                 description: Date response recieved from this job
 *               dateInterview:
 *                 type: Date
 *                 description: Date of interview for this job
 *               dateOffer:
 *                 type: Date
 *                 description: Date of Offer  for this job
 *               appStatus:
 *                 type: String
 *                 description: APPLIED, WAITING, INTERVIEW SCHEDULED, or INTERVIEW DONE
 *               nextSteps:
 *                 type: String
 *                 description: next steps for this job
 *               decision:
 *                 type: String
 *                 description: decision made for this job
 *     responses:
 *       200:
 *         description: Successfully added new job
 *       400:
 *         description: One of the required fields was not submitted
 *       401:
 *         description: Not Authorized
 */
// get and create jobs
router.route('/').get(protect, getJobs).post(protect, setJob)

/**
* @swagger
* /jobs/{jobID}:
*   put:
*     summary: Update a job by ID - Need Auth
*     tags: [Jobs]
*     security:
*       - BearerAuth: [read]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: String
*         required: true
*         description: MongoDB ID of the job to update
*     requestBody:
*       required: true
*       content:
*         application/x-www-form-urlencoded:
*           schema:
*             type: object
*             properties:
*               jobTitle:
*                 type: String
*                 description: Job title of job
*               jobCompany:
*                 type: String
*                 description: Company offering job
*               jobType:
*                 type: String
*                 description: FULLTIME or INTERNSHIP
*               appLink:
*                 type: String
*                 description: Link to application
*               jobSkills:
*                 type: Array of Strings
*                 description: Skills listed for this job
*               jobBenefits:
*                 type: Array of Strings
*                 description: Benefits listed for this job
*               jobLocation:
*                 type: String
*                 description: location listed for this job
*               jobDescription:
*                 type: String
*                 description: Description for this job
*               dateApplied:
*                 type: Date
*                 description: Date applied to this job
*               dateResponse:
*                 type: Date
*                 description: Date response recieved from this job
*               dateInterview:
*                 type: Date
*                 description: Date of interview for this job
*               dateOffer:
*                 type: Date
*                 description: Date of Offer  for this job
*               appStatus:
*                 type: String
*                 description: APPLIED, WAITING, INTERVIEW SCHEDULED, or INTERVIEW DONE
*               nextSteps:
*                 type: String
*                 description: next steps for this job
*               decision:
*                 type: String
*                 description: decision made for this job
*     responses:
*       200:
*         description: Successfully updated job
*       400:
*         description: Job not found - Job ID invalid
*       401:
*         description: Not Authorized
*/

/**
* @swagger
* /jobs/{jobID}:
*   delete:
*     summary: Delete a job by ID - Need Auth
*     tags: [Jobs]
*     security:
*       - BearerAuth: [read]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: String
*         required: true
*         description: MongoDB ID of the job to delete
*     responses:
*       200:
*         description: Successfully deleted job
*       400:
*         description: Job not found - Job ID invalid
*       401:
*         description: Not Authorized
*/
// delete and update jobs
router.route('/:id').delete(protect, deleteJob).put(protect, updateJob)

module.exports = router
