const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { uuid } = require('uuidv4');

const { isLoggedIn } = require('../middleware/authMiddleware');

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
		const user = await User.findById(req.user._id)
		campaign.uniqueCode = uuid();
		campaign.admin = user._id
		await campaign.save();
		user.campaigns.push(campaign._id)
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
	
	if (campaign.length < 1) {
		res.status(401).json({msg: 'This campaign code does not exist'})
	} else {
		res.status(200).json(campaign)
	}
}))

// Edit a campaign (including adding new users/characters)
router.put('/:campaignId', isLoggedIn, asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id)
		const campaign = await Campaign.findById(req.params.campaignId)
		
		console.log(user)
		console.log(campaign)
		
		res.status(200).json({userEditting: user, campaignToBeEditted: campaign})
	} catch (err) {
		console.log(err)
		throw new Error(err)
	}
}))

// Join a campaign
router.put('/', isLoggedIn, asyncHandler(async (req, res) => {
	try {
		
	} catch (err) {
		
	}
}))

// Delete campaign (as long as you are logged in and are the admin)
// router.delete('/:campaignId', isLoggedIn, isAdmin, asyncHandler(asyncHandler (req, res) => {

// }))


module.exports = router;