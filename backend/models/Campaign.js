const mongoose = require('mongoose');

const CampaignSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  uniqueCode: {
    type: String,
    required: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
		required: true
  },
  characters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character',
    },
  ],
  lootItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LootItem',
    },
  ],
  magicItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MagicItem',
    },
  ],
  quests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quest',
    },
  ],
  nonPlayableCharacters: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NonPlayableCharacter',
    },
  ],
});

module.exports = mongoose.model('Campaign', CampaignSchema);
