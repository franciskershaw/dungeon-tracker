const mongoose = require('mongoose');

const LootItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
		type: Number,
    min: 0,
		required: true
	}
});

module.exports = mongoose.model('LootItem', LootItemSchema);
