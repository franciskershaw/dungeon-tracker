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
    // Delete associated customStats
    const characters = await Character.find({ _id: doc.characters})
    const customStatIds = []
    characters.forEach((character) => {
			character.customStats.forEach((customStat) => {
				customStatIds.push(customStat)
			})
		})
    await CustomStat.deleteMany({
      _id: customStatIds
    })
    // Delete associated characters
    await Character.deleteMany({
      _id: {
        $in: doc.characters,
      },
    });
    // Delete associated lootItems
    await LootItem.deleteMany({
      _id: {
        $in: doc.lootItems,
      },
    });
    // Delete associated magicItems
    await MagicItem.deleteMany({
      _id: {
        $in: doc.magicItems,
      },
    });
    // Delete associated quests
    await Quest.deleteMany({
      _id: {
        $in: doc.quests,
      },
    });
    // Delete associated NPCs
    await NonPlayableCharacter.deleteMany({
      _id: {
        $in: doc.nonPlayableCharacters,
      },
    });
    // Update user to remove campaign and also associated character from respective arrays
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
const CustomStat = require('./CustomStat');
const User = require('./User');
const LootItem = require('./LootItem');
const MagicItem = require('./MagicItem');
const Quest = require('./Quest');
const NonPlayableCharacter = require('./NonPlayableCharacter');
