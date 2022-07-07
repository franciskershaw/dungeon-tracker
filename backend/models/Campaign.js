const mongoose = require('mongoose');

const CampaignSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueCode: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
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

CampaignSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Character.deleteMany({
      _id: {
        $in: doc.characters,
      },
    });
    await LootItem.deleteMany({
      _id: {
        $in: doc.lootItems,
      },
    });
    await MagicItem.deleteMany({
      _id: {
        $in: doc.magicItems,
      },
    });
    await Quest.deleteMany({
      _id: {
        $in: doc.quests,
      },
    });
    await NonPlayableCharacter.deleteMany({
      _id: {
        $in: doc.nonPlayableCharacters,
      },
    });
    await User.updateMany(
      { campaigns: { $in: doc._id } },
      { $pull: { characters: { $in: doc.characters } } }
    );
    await User.updateMany(
      { campaigns: { $in: doc._id } },
      { $pull: { campaigns: doc._id } }
    );
  }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
const Character = require('./Character');
const User = require('./User');
const LootItem = require('./LootItem');
const MagicItem = require('./MagicItem');
const Quest = require('./Quest');
const NonPlayableCharacter = require('./NonPlayableCharacter');