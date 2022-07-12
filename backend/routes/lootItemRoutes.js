const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const LootItem = require('../models/LootItem');
const Campaign = require('../models/Campaign');

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

// Edit loot item
router.put('/:lootItemId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const { lootItemId } = req.params;

	try {
		const lootItem = await LootItem.findByIdAndUpdate(lootItemId, { ...req.body }, { new: true })
		res.status(200).json(lootItem)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Get party loot items
router.get('/campaign/:campaignId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const { campaignId } = req.params;
	try {
		const campaign = await Campaign.findById(campaignId)
		const lootItems = await LootItem.find({ _id: campaign.lootItems })
		res.status(200).json(lootItems)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

router.delete('/:lootItemId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const { lootItemId } = req.params;
	try {
		await LootItem.findByIdAndDelete(lootItemId)
		await Campaign.updateOne(
      { _id: req.body.campaignId },
      { $pull: { lootItems: lootItemId } }
    )
		res.status(200).json({item: lootItemId, campaign: req.body.campaignId})
	} catch (err) {
		
	}
}))

module.exports = router;
