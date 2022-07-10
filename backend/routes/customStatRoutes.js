// Doing this the conventional way for now (refresh) but will look into doing this with socket.io once a basic frontend has been set up

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const CustomStat = require('../models/CustomStat')
const User = require('../models/User');
const Character = require('../models/Character')

const { isLoggedIn, isCharacterCreator, isStatCreator, isInCampaign } = require('../middleware/authMiddleware');

// Add new stat
router.post('/:characterId', isLoggedIn, isCharacterCreator, asyncHandler(async (req, res) => {
	// const user = await User.findById(req.user.id)
	const character = await Character.findById(req.params.characterId)

	try {
		const customStat = new CustomStat(req.body)

		customStat.currentAmount = req.body.maxAmount
		customStat.character = character.id

		character.customStats.push(customStat.id)

		await customStat.save()
		await character.save()
		
		res.status(201).json(customStat)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Edit stat
router.put('/:customStatId', isLoggedIn, isStatCreator, asyncHandler(async (req, res) => {
	const { customStatId } = req.params;
	const customStat = await CustomStat.findByIdAndUpdate(customStatId, { ...req.body }, {new: true})

	try {
		if (customStat.currentAmount > customStat.maxAmount) {
			customStat.currentAmount = customStat.maxAmount
		}
		res.status(200).json(customStat)	
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Delete stat
router.delete('/:customStatId', isLoggedIn, isStatCreator, asyncHandler(async (req, res) => {
	const { customStatId } = req.params;
	try {
		await CustomStat.findByIdAndDelete(customStatId)
		res.status(200).json(customStatId)	
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Get stats for specific character
router.get('/:characterId', isLoggedIn, isCharacterCreator, asyncHandler(async (req, res) => {
	const { characterId } = req.params;
	try {
		const character = await Character.findById(characterId)
		const stats = await CustomStat.find({ _id: character.customStats })
		res.status(200).json(stats)	
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Get all stats for a party
router.get('/:campaignId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {

}))

module.exports = router;