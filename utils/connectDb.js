const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = () => {
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
}