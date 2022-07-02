const mongoose = require('mongoose');
const CustomStat = require('./CustomStat');
const MagicItem = require('./MagicItem');
const Campaign = require('./Campaign');

const CharacterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    await Campaign.updateOne({

    });
    await User.updateOne({
      
    })
  }
});

module.exports = mongoose.model('Character', CharacterSchema);
