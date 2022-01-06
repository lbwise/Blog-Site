const { Schema, model } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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
});

userSchema.plugin(passportLocalMongoose);

module.exports = model('User', userSchema);