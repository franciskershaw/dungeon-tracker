const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const User = require('../models/User')
const Character = require('../models/Character')

const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

const isCharacterCreator = async (req, res, next) =>{
  console.log('Checking this is your character')
}

const isCampaignAdmin = asyncHandler(async (req, res, next) => {
  console.log('Checking you are the dungeon master')
})

const isInCampaign = asyncHandler(async (req, res, next) => {
  console.log('Checking you are part of this campaign')
})

module.exports = { isLoggedIn, isCharacterCreator, isCampaignAdmin, isInCampaign }
