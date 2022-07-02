const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { isLoggedIn, isCharacterCreator, isInCampaign } = require('../middleware/authMiddleware');

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
		character.campaign = req.body.campaignId

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

// Edit a character (as long as you own that character)
router.put('/:characterId', isLoggedIn, isCharacterCreator, asyncHandler(async (req, res) => {
		const { characterId } = req.params;
		const character = await Character.findByIdAndUpdate(characterId, { ...req.body })
		res.status(200).json(character)	
}))

// Get all characters on a specific campaign
router.get('/:campaignId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	console.log(`Attempting to get all characters from campaign ${req.params.campaignId}`)
	try {
		const campaign = await Campaign.findById(req.params.campaignId)
		const characters = await Character.find({_id: campaign.characters})
		res.status(200).json(characters)
	} catch (err) {
		console.log(err)
		throw new Error(err)
	}
}))

// Delete a character (and therefore leave the campaign)
router.delete('/:characterId', isLoggedIn, isCharacterCreator, asyncHandler(async (req, res) => {
	console.log(`Attempting to delete character ${req.params.characterId}`)
	const { characterId } = req.params;
	await Character.findByIdAndDelete(characterId)
	res.status(200).json(characterId)
}))

module.exports = router;