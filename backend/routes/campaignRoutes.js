const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');

const { isLoggedIn, isCampaignAdmin } = require('../middleware/authMiddleware');

const User = require('../models/User');
const Campaign = require('../models/Campaign');

// Get all campaigns from DB (DELETE THIS ROUTE BEFORE DEPLOYMENT)
router.get('/', asyncHandler(async (req, res) => {
	try {
		const campaigns = await Campaign.find();
		res.status(200).json(campaigns)
	} catch (err) {
		console.log(err)
		throw new Error(err)
	}
}))

// Create a new campaign (for a logged in user, becomes admin)
router.post('/', isLoggedIn, asyncHandler(async (req, res) => {
	try {
		const campaign = new Campaign(req.body)
		const user = await User.findById(req.user.id)
		campaign.uniqueCode = uuidv4();
		campaign.users.push(user.id)
		campaign.admin = user.id
		await campaign.save();
		user.campaigns.push(campaign.id)
		await user.save()
		
		res.status(201).json(campaign)
	} catch (err) {
		console.log(err)
		throw new Error('Unable to create a new campaign')
	}
}))

// Get a user's available campaigns
router.get('/user/:userId', isLoggedIn, asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		if (!user) {
			res.status(404).json({msg: 'This user does not exist'})
		}
		res.status(200).json(user.campaigns)
	} catch (err) {
		console.log(err)
		throw new Error("Unable to get user's joined campaigns")
	}
}))

// Get a specific campaign from the unique code
router.get('/join', isLoggedIn, asyncHandler(async (req, res) => {
	const uniqueCode = req.body.uniqueCode
	const campaign = await Campaign.find({ uniqueCode })

	try {
		if (campaign.length < 1) {
			res.status(404)
			throw new Error('This campaign code does not exist')
		} else {
			res.status(200).json(campaign)
		}	
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

// Edit a campaign
router.put('/:campaignId', isLoggedIn, asyncHandler(async (req, res) => {
	let user

	try {
		if (req.user) {
			user = await User.findById(req.user.id)
		} else {
			throw new Error('No user?')
		}
		const campaign = await Campaign.findById(req.params.campaignId)
		
		if (!campaign) {
			res.status(404)
			throw new Error('Campaign not found')
		}
		
		if (!campaign.users.includes(req.user.id)) {
			res.status(401)
			throw new Error('You can only edit campaigns you have joined or are admin for')
		} 
	
		const updatedCampaign = await Campaign.findByIdAndUpdate(
			req.params.campaignId,
			{...req.body},
			{ new: true }
		)
		
		res.status(200).json(updatedCampaign)	
	} catch (err) {
		res.json(400)
		throw new Error(err)
	}
}))

// Delete campaign (as long as you are logged in and are the admin)
router.delete('/:campaignId', isLoggedIn, isCampaignAdmin, asyncHandler (async(req, res) => {
	const { campaignId } = req.params
	try {
		await Campaign.findByIdAndDelete(campaignId);
		res.status(200).json({campaignId})	
	} catch (err) {
		res.status(400)
		throw new Error(err)
	}
}))

module.exports = router;