const mongoose = require('mongoose');

const CharacterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  maxHp: {
    type: Number,
    required: true,
  },
  currentHp: {
    type: Number,
  },
  maxHitDice: {
    type: Number,
    required: true,
  },
  currentHitDice: {
    type: Number,
  },
  customStats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CustomStat',
    },
  ],
  magicItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MagicItem',
    },
  ],
});

CharacterSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await CustomStat.deleteMany({
      _id: {
        $in: doc.customStats,
      },
    });
    await MagicItem.deleteMany({
      _id: {
        $in: doc.magicItems,
      },
    });
    await Campaign.updateOne(
      { _id: doc.campaign },
      { $pull: { characters: doc._id } }
    );
    await Campaign.updateOne(
      { _id: doc.campaign },
      { $pull: { users: doc.createdBy } }
    );
    // needs to pull the character id and campaign id from user document
    await User.updateOne(
      { _id: doc.createdBy },
      { $pull: { campaigns: doc.campaign } }
    );
    await User.updateOne(
      { _id: doc.createdBy },
      { $pull: { characters: doc._id } }
    );
  }
});

module.exports = mongoose.model('Character', CharacterSchema);
const CustomStat = require('./CustomStat');
const MagicItem = require('./MagicItem');
const Campaign = require('./Campaign');
const User = require('./User');