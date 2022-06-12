const mongoose = require('mongoose');

const MagicItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
  requiresAttuning: {
		type: Boolean,
		required: true
	},
	attuned: {
		type: Boolean,
	},
  hyperlink: {
    type: String,
  }
});

module.exports = mongoose.model('MagicItem', MagicItemSchema);
