const mongoose = require('mongoose');

const LootItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('LootItem', LootItemSchema);
