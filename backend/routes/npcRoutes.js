const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const NPC = require('../models/NonPlayableCharacter')
const Campaign = require('../models/Campaign');

const { isLoggedIn, isInCampaign } = require('../middleware/authMiddleware');

router.post('/', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const campaign = await Campaign.findById(req.body.campaignId)

	try {
		const npc = new NPC(req.body)
		campaign.nonPlayableCharacters.push(npc._id)

		await npc.save()
		await campaign.save()

		res.status(201).json(npc)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

router.put('/:npcId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const { npcId } = req.params;

	try {
		const npc = await NPC.findByIdAndUpdate(npcId, { ...req.body }, { new: true })
		res.status(200).json(npc)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

router.get('/campaign/:campaignId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const { campaignId } = req.params;
	try {
		const campaign = await Campaign.findById(campaignId)
		const npcs = await NPC.find({ _id: campaign.nonPlayableCharacters })
		res.status(200).json(npcs)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Delete NPC
router.delete('/:npcId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const { npcId } = req.params;
	try {
		await NPC.findByIdAndDelete(npcId)
		await Campaign.updateOne(
      { _id: req.body.campaignId },
      { $pull: { nonPlayableCharacters: npcId } }
    )
		res.status(200).json({npc: npcId, campaign: req.body.campaignId})
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

module.exports = router;