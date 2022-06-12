const mongoose = require('mongoose');

const CustomStatSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  character: {
    type: mongoose.Schema.Types.ObjectId,
		required: true
  },
  maxAmount: {
    type: Number,
    required: true
  },
	currentAmount: {
    type: Number,
  },
  shortRestRestore: {
		type: Boolean,
		required: true
	},
	shortRestRestoreAmount: {
		type: Number,
		required: true
	},
  longRestRestore: {
		type: Boolean,
		required: true
	},
	longRestRestoreAmount: {
		type: Number,
		required: true
	},

});

module.exports = mongoose.model('CustomStat', CustomStatSchema);
