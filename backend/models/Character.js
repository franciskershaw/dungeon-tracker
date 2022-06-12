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

module.exports = mongoose.model('Character', CharacterSchema);
