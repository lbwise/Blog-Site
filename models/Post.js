const { Schema, model } = require('mongoose');

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		max: 100
	},
	likes: {
		type: Number,
		default: 0,
	},
	content: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	user: {
		type: Schema.Types.ObjectID,
		ref: 'User'
	}
});

module.exports = model('Post', postSchema);