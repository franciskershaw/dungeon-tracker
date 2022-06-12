const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
	campaigns: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Campaign'
		}
	],
	characters: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Character'
		}
	]
});

module.exports = mongoose.model('User', UserSchema);
