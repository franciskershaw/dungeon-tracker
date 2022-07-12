const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const MagicItem = require('../models/MagicItem')
const Campaign = require('../models/Campaign')
const Character = require('../models/Character')

const { isLoggedIn, isInCampaign, canEditMagicItem, isCharacterCreator } = require('../middleware/authMiddleware');

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
router.put('/:magicItemId', isLoggedIn, isInCampaign, canEditMagicItem, asyncHandler(async (req, res) => {
	const { magicItemId } = req.params;

	try {
		const magicItem = await MagicItem.findByIdAndUpdate(magicItemId, { ...req.body }, { new: true })
		res.status(200).json(magicItem)	
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Delete a magicItem
router.delete('/:magicItemId', isLoggedIn, isInCampaign, canEditMagicItem, asyncHandler(async (req, res) => {
	const { magicItemId } = req.params;
	try {
		await MagicItem.findByIdAndDelete(magicItemId);
		res.status(200).json(magicItemId)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Get a user's magicItems
router.get('/character/:characterId', isLoggedIn, isCharacterCreator, asyncHandler(async (req, res) => {
	const { characterId } = req.params;
	try {
		const character = await Character.findById(characterId)
		const magicItems = await MagicItem.find({ _id: character.magicItems })
		res.status(200).json(magicItems)	
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Get a party's magicItems
router.get('/campaign/:campaignId', isLoggedIn, isInCampaign, asyncHandler(async (req, res) => {
	const { campaignId } = req.params;
	try {
		const campaign = await Campaign.findById(campaignId)
		const magicItems = await MagicItem.find({ _id: campaign.magicItems })
		res.status(200).json(magicItems)
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

module.exports = router;