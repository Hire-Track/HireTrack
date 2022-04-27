const express = require('express')
const router = express.Router()
const {
  getContacts,
  setContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController.js')
const { protect } = require('../middleware/authMiddleware.js')
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *   schemas:
 *     Contacts:
 *       type: object
 *       required:
 *         - contactName
 *         - user
 *         - jobID
 *       properties:
 *         _id:
 *           type: String
 *           description: Contacts's auto-generated unique mongoDB id
 *         user:
 *           type: String
 *           description: Unique user id of user creating this contact
 *         jobID:
 *           type: String
 *           description: ID of the user's job to place this contact under
 *         contactName:
 *           type: String
 *           description: Name of the contact
 *         contactCompany:
 *           type: String
 *           description: Company contact works for
 *         contactJobTitle:
 *           type: String
 *           description: Job title of contact
 *         contactPhone:
 *           type: String
 *           description: Phone # of contact
 *         contactEmail:
 *           type: String
 *           description: Email of contact
 */

/**
  * @swagger
  * tags:
  *   name: Contacts
  *   description: The contact managing API
  */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Get all current user's contacts for a given jobID - Need Auth
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: [read]
*     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - jobID
 *             properties:
 *               jobID:
 *                 type: String
 *                 description: ID of the user's job to place this contact under
 *     responses:
 *       200:
 *         description: Success - all User's contacts for this JobID in JSON Format
 *       401:
 *         description: Not Authorized
 */
/**
 * @swagger
 * /Contacts:
 *   post:
 *     summary: Create a user contact under a specific job - Need Auth
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: [read]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *              - contactName
 *              - jobID
 *             properties:
 *               jobID:
 *                 type: String
 *                 description: ID of the user's job to place this contact under
 *               contactName:
 *                 type: String
 *                 description: Name of the contact
 *               contactCompany:
 *                 type: String
 *                 description: Company contact works for
 *               contactJobTitle:
 *                 type: String
 *                 description: Job title of contact
 *               contactPhone:
 *                 type: String
 *                 description: Phone # of contact
 *               contactEmail:
 *                 type: String
 *                 description: Email of contact
 *     responses:
 *       200:
 *         description: Successfully added new contact
 *       400:
 *         description: One of the required fields was not submitted
 *       401:
 *         description: Not Authorized
 */
// get and create contacts
router.route('/').get(protect, getContacts).post(protect, setContact)

/**
* @swagger
* /contacts/{contactID}:
*   put:
*     summary: Update a contact by ID - Need Auth
*     tags: [Contacts]
*     security:
*       - BearerAuth: [read]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: String
*         required: true
*         description: MongoDB ID of the contact to update
*     requestBody:
*       required: true
*       content:
*         application/x-www-form-urlencoded:
*           schema:
*             type: object
*             properties:
*               jobID:
*                 type: String
*                 description: ID of the user's job to place this contact under
*               contactName:
*                 type: String
*                 description: Name of the contact
*               contactCompany:
*                 type: String
*                 description: Company contact works for
*               contactJobTitle:
*                 type: String
*                 description: Job title of contact
*               contactPhone:
*                 type: String
*                 description: Phone # of contact
*               contactEmail:
*                 type: String
*                 description: Email of contact
*     responses:
*       200:
*         description: Successfully updated contact
*       400:
*         description: Contact not found - Contact ID invalid
*       401:
*         description: Not Authorized
*/

/**
* @swagger
* /contacts/{contactID}:
*   delete:
*     summary: Delete a contact by ID - Need Auth
*     tags: [Contacts]
*     security:
*       - BearerAuth: [read]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: String
*         required: true
*         description: MongoDB ID of the contact to Delete
*     responses:
*       200:
*         description: Successfully deleted contact
*       400:
*         description: Contact not found - Contact ID invalid
*       401:
*         description: Not Authorized
*/
// update and delete a contact
router.route('/:id').delete(protect, deleteContact).put(protect, updateContact)

module.exports = router
