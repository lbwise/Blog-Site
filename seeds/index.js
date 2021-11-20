const mongoose = require('mongoose');
const chalk = require('chalk');
const Post = require('../models/post');
const samplePosts = require('./seedPosts')

mongoose.connect('mongodb://localhost:27017/blog', { 
	useNewUrlParser: true, 
	useUnifiedTopology: true 
	})
	.then(() => {
		console.log(chalk.yellow('DATABASE CONNECTED'));
	})
	.catch(err => {
		console.log(chalk.red('THERE WAS AN ERROR'));
		console.log(err);
	});

const setSeeds = async data => {
	await Post.deleteMany({})
	for (let i = 0; i < 3; i++) {
		const post = new Post(data[i]);
		await post.save()
	}
	console.log(chalk.green('SEED POSTS SAVED'));
}

setSeeds(samplePosts);




