const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/User');

// Register new user
router.post('/', asyncHandler(async (req, res) => {
	const { userName, email, password } = req.body;

	// Validation
	if (!userName || !email || !password) {
		res.status(400)
		throw new Error('Please include all fields')
	}

	// Check user doesn't already exist
	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}

	// Hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)

	// Create user
	const user = await User.create({
		userName,
		email,
		password: hashedPassword,
		campaigns: [],
		characters: []
	})

	if (user) {
		res.status(201).json({
			_id: user._id,
			userName: user.userName,
			email: user.email,
			campaigns: user.campaigns,
			characters: user.characters,
			token: generateToken(user._id)
		})
	} else {
		res.status(400)
		throw new Error('Invalid user data')
	}
}))

// Login a user
router.post('/login', asyncHandler(async (req, res) => {
	try {
			const { email, password } = req.body;

			const user = await User.findOne({ email })
			
			// Check credentials match
			if (user && (await bcrypt.compare(password, user.password))) {
					res.status(200).json({
							_id: user._id,
							name: user.userName,
							email: user.email,
							token: generateToken(user._id),
					})
			} else {
					res.status(401).json({message: 'Invalid credentials'})
					throw new Error('Invalid credentials')
			}
	} catch (err) {
			console.log(err)
	}
}))

// Get all users
router.get('/', asyncHandler(async (req, res) => {
	try {
		const users = await User.find()
		res.status(200).json(users)
	} catch (err) {
		console.log(err)
		res.status(400).json({message: "Can't find users"})
	}
}))

// Generate token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	})
}

module.exports = router;