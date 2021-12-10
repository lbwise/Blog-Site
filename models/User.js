const { Schema, model } = require('mongoose');

const userSchema = Schema({
	username: {
		type: String,
		require: [true, 'Username Required'],
		maxLength: 10,
		minLenght: 0,
	},
	password: {
		type: String,
		require: [true, 'Password Required'],
		maxLength: 10,
		minLenght: 0,
	},
	premium: {
		type: Boolean,
		default: false,
	},
	articles: {
		type: Schema.Types.ObjectID,
		ref: 'Post',
	},
	userCreated: Date,


}) 