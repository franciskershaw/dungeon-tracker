const mongoose = require('mongoose');

const NonPlayableCharacterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  information: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('NonPlayableCharacter', NonPlayableCharacterSchema);
