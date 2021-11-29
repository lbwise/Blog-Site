const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const methodOverride = require('method-override');
const chalk = require('chalk');
const path = require('path');
const Post = require('./models/Post');
const app = express();
const PORT = 3000

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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

app.get('/posts', async (req, res) => {
	const posts = await Post.find({})
	res.render('posts/home', { posts });
});

app.get('/posts/new', (req, res) => {
	res.render('posts/new');
});

app.post('/posts', async (req, res) => {
	const newPostData = req.body;
	const newPost = new Post(newPostData);
	await newPost.save();
	res.redirect(`/posts/${newPost._id}`);
});

app.delete('/posts/:id', async (req, res) => {
	const id = req.params.id;
	await Post.findByIdAndDelete(id);
	res.redirect('/posts')
});

app.get('/posts/:id/edit', async (req, res) => {
	const id = req.params.id;
	const post = await Post.findById(id);
	res.render('posts/edit', { post });
})

app.patch('/posts/:id', async (req, res) => {
	const { title, content } = req.body;
	const post = await Post.findByIdAndUpdate(req.params.id, { title: title, content: content});
	res.redirect(`/posts/${post._id}`);
});

app.get('/posts/:id', async (req, res) => {
	const id = req.params.id;
	const post = await Post.findById(id);
	res.render('posts/show', { post });
});

app.use((req, res, next) => {
	res.render('404');
});

app.listen(PORT, () => {
	console.log(chalk.blueBright(`LISTENING ON PORT: ${PORT}`));
});