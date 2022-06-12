const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { uuid } = require('uuidv4');

const { isLoggedIn } = require('../middleware/authMiddleware');

const Campaign = require('../models/Campaign');

// Get a user's available campaigns

// Create a new campaign (for a logged in user)
router.post('/', isLoggedIn, asyncHandler(async (req, res) => {
	try {
		const campaign = new Campaign(req.body)
		campaign.uniqueCode = uuid();
		await campaign.save();
		res.status(201).json(campaign)
	} catch (err) {
		console.log(err)
	}
}))

// Edit a campaign (as long as you are logged in and are the admin)

// Delete campaign (as long as you are logged in and are the admin)


module.exports = router;