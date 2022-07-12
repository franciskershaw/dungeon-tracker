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

module.exports = router;