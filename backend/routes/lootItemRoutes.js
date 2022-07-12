const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const LootItem = require('../models/LootItem');
const Campaign = require('../models/Campaign')
const Character = require('../models/Character')

const { isLoggedIn, isInCampaign } = require('../middleware/authMiddleware');

// Add a new loot item
router.post('/', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const campaign = await Campaign.findById(req.body.campaignId)

	try {
		const lootItem = new LootItem(req.body)
		campaign.lootItems.push(lootItem._id)

		await lootItem.save()
		await campaign.save()

		res.status(201).json(lootItem)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

module.exports = router;
