// Doing this the conventional way for now (refresh) but will look into doing this with socket.io once a basic frontend has been set up

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const User = require('../models/User');

const { isLoggedIn } = require('../middleware/authMiddleware');

// Add new stat
router.post('/:characterId', isLoggedIn, asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id)
	console.log(user)
	res.status(200).json({msg: 'attempting to create stat'})
}))

// Edit stat

// Delete stat

// Get stats for specific character

module.exports = router;