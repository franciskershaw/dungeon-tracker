const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const User = require('../models/User');
const Character = require('../models/Character');
const Campaign = require('../models/Campaign');
const CustomStat = require('../models/CustomStat');
const MagicItem = require('../models/MagicItem');

const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not authorized');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

const isCharacterCreator = async (req, res, next) => {
  const { characterId } = req.params;
  const character = await Character.findById(characterId);

  try {
    if (character.createdBy.equals(req.user.id)) {
      next();
    } else {
      res.status(401);
      throw new Error('This is not your character to edit');
    }
  } catch (err) {
    next(err);
  }
};

const isCampaignAdmin = asyncHandler(async (req, res, next) => {
  const { campaignId } = req.params;
  const campaign = await Campaign.findById(campaignId);

  try {
    if (campaign.admin.equals(req.user.id)) {
      next();
    } else {
      res.status(401);
      throw new Error('You need to be the admin to delete this campaign');
    }
  } catch (err) {
    next(err);
  }
});

const isInCampaign = asyncHandler(async (req, res, next) => {
  let campaignId
  if (req.params.campaignId) {
    campaignId = req.params.campaignId
  } else if (req.body.campaignId) {
    campaignId = req.body.campaignId
  }
  
  const campaign = await Campaign.findById(campaignId);

  try {
    if (campaignId) {
      if (campaign.users.includes(req.user.id)) {
        next();
      } else {
        res.status(401);
        throw new Error("You're not part of this campaign");
      }
    } else {
      res.status(400)
      throw new Error("You need to choose which campaign this item belongs to")
    }
  } catch (err) {
    next(err);
  }
});

const isStatCreator = asyncHandler(async (req, res, next) => {
  const { customStatId } = req.params;
  const customStat = await CustomStat.findById(customStatId);

  try {
    if (req.user.characters.includes(customStat.character)) {
      next();
    } else {
      throw new Error('This is not your stat to delete');
    }
  } catch (err) {
    next(err);
  }
});

// If the magicItem is owned by campaign - anyone can edit
// If the magicItem is owned by a specific character - only that character's user can edit it
const canEditMagicItem = asyncHandler(async (req, res, next) => {
  const magicItem = await MagicItem.findById(req.params.magicItemId)
  const campaign = await Campaign.findById(req.body.campaignId)
  
  try {
    // If magicItem is owned by a campaign - anyone can edit
    if (magicItem.ownedBy.toString() === campaign.id) {
      console.log('This item is owned by the party and can be edited')
      next()
    }

    // If the magic item is owned by a character, and logged in user owns that character - user can edit it
    if (req.user.characters.includes(magicItem.ownedBy)) {
      console.log('This item is owned by the character belonging to the current user - go ahead')
      next()
    }

    // If neither of the above is true, throw an error
    if ((magicItem.ownedBy.toString() !== campaign.id) && !(req.user.characters.includes(magicItem.ownedBy))) {
      throw new Error("You're not allowed to edit someone else's magic item")
    }  
  } catch (err) {
    next(err)
  }
})

module.exports = {
  isLoggedIn,
  isCharacterCreator,
  isCampaignAdmin,
  isInCampaign,
  isStatCreator,
  canEditMagicItem
};
