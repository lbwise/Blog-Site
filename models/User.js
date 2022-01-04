const { Schema, model } = require('mongoose');
const passport = require('')

const userSchema = Schema({
	email: {
		type: String,
		required: true,
	},
	articles: [{
		type: Schema.Types.ObjectID,
		ref: 'Post',
	}],
	userCreated: {
		type: Date,
		default: Date.now(),
	},
}) 

module.exports = model('User', userSchema);