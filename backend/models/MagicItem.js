const mongoose = require('mongoose');

const MagicItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
  requiresAttuning: {
    type: Boolean,
    required: true,
  },
  attuned: {
    type: Boolean,
    required: function checkRequired() {
      if (this.requiresAttuning) {
        return true;
      } else {
        return false;
      }
    },
  },
  hyperlink: {
    type: String,
  },
});

MagicItemSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Character.updateOne(
      { _id: doc.ownedBy },
      { $pull: { magicItems: doc._id } }
    );
    // await Campaign.updateOne(
    //   { _id: doc.}
    // )
  }
});

module.exports = mongoose.model('MagicItem', MagicItemSchema);
const Character = require('./Character');