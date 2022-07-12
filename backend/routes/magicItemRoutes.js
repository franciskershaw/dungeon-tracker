const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const MagicItem = require('../models/MagicItem')
const Campaign = require('../models/Campaign')
const Character = require('../models/Character')

const { isLoggedIn, isInCampaign } = require('../middleware/authMiddleware');

// Add a new magicItem
router.post('/', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const campaign = await Campaign.findById(req.body.campaignId)

	try {
		const magicItem = new MagicItem(req.body)
		campaign.magicItems.push(magicItem._id)

		/* Check whether the item is owned by a specific character or by the party
			 and ensure character document includes item if it is the former */ 
		if (req.body.campaignId !== req.body.ownedBy) {
			let character = await Character.findById(req.body.ownedBy)
			character.magicItems.push(magicItem._id)
			await character.save()
		}
	
		await magicItem.save()
		await campaign.save()
		
		res.status(201).json(magicItem)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Edit a magicItem

// Delete a magicItem

// Get a user's magicItems

// Get a party's magicItems

module.exports = router;