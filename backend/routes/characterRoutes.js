const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { isLoggedIn, isCharacterCreator } = require('../middleware/authMiddleware');

const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Character = require('../models/Character')

// Create character, which also amends campaign to include the user and new character ids
router.post('/', isLoggedIn, asyncHandler(async (req, res) => {
	try {
		const character = new Character(req.body)
		const user = await User.findById(req.user.id)
		const campaign = await Campaign.findById(req.body.campaignId)

		character.createdBy = user.id;
		character.currentHp = req.body.maxHp
		character.currentHitDice = req.body.maxHitDice

		user.characters.push(character.id)
		user.campaigns.push(campaign.id)

		campaign.characters.push(character.id)
		campaign.users.push(user.id)

		await character.save()
		await campaign.save()
		await user.save()

		res.status(201).json(character)
	} catch (err) {
		console.log(err)
		throw new Error('Unable to create a new character')
	}
}))

module.exports = router;