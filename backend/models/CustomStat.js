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
  shortRestRestoreAmount: {
    type: Number,
    required: function checkRequired() {
      if (this.shortRestRestore) {
        return true;
      } else {
        return false;
      }
    },
    validate: {
      validator: function (number) {
        return number && number <= this.maxAmount && number > 0;
      },
      message:
        'Short rest amount cannot be more than the maximum amount or less than 0',
    },
  },
  longRestRestore: {
    type: Boolean,
    required: true,
  },
  longRestRestoreAmount: {
    type: Number,
    required: function checkRequired() {
      if (this.longRestRestore) {
        return true;
      } else {
        return false;
      }
    },
    validate: {
      validator: function (number) {
        return number && number <= this.maxAmount && number > 0;
      },
      message: 'Long rest restore cannot exceed maximum amount or be less than 0',
    },
  },
});

module.exports = mongoose.model('CustomStat', CustomStatSchema);
