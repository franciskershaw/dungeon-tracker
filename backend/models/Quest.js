const mongoose = require('mongoose');

const QuestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Quest', QuestSchema);
