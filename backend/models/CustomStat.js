const mongoose = require('mongoose');

const CustomStatSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  character: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  maxAmount: {
    type: Number,
    required: true,
    min: 1,
  },
  currentAmount: {
    type: Number,
    validate: {
      validator: function (number) {
        return number && number <= this.maxAmount;
      },
      message: 'Current amount cannot exceed maximum amount',
    },
  },
  shortRestRestore: {
    type: Boolean,
    required: true,
  },
  longRestRestore: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model('CustomStat', CustomStatSchema);
