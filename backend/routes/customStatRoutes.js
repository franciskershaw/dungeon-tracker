// Doing this the conventional way for now (refresh) but will look into doing this with socket.io once a basic frontend has been set up

const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

// Add new stat
router.post('/', asyncHandler(async (req, res) => {
	res.status(200).json({msg: 'attempting to create stat'})
}))

// Edit stat

// Delete stat

// Get stats for specific character

module.exports = router;