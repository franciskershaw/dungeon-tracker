const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const Quest = require('../models/Quest');
const Campaign = require('../models/Campaign');

const { isLoggedIn, isInCampaign } = require('../middleware/authMiddleware');

router.post('/', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const campaign = await Campaign.findById(req.body.campaignId)

	try {
		const quest = new Quest(req.body)
		campaign.quests.push(quest._id)

		await quest.save()
		await campaign.save()

		res.status(201).json(quest)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

router.put('/:questId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const { questId } = req.params;

	try {
		const quest = await Quest.findByIdAndUpdate(questId, { ...req.body }, { new: true })
		res.status(200).json(quest)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Get all quests for a campaign
router.get('/campaign/:campaignId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const { campaignId } = req.params;
	try {
		const campaign = await Campaign.findById(campaignId)
		const quests = await Quest.find({ _id: campaign.quests })
		res.status(200).json(quests)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Delete quest
router.delete('/:questId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const { questId } = req.params;
	try {
		await Quest.findByIdAndDelete(questId)
		await Campaign.updateOne(
      { _id: req.body.campaignId },
      { $pull: { quests: questId } }
    )
		res.status(200).json({quest: questId, campaign: req.body.campaignId})
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

module.exports = router;