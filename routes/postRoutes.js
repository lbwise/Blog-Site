const express = require('express');
const Post = require('../models/Post');
const { isLoggedIn } = require('../middleware'); 
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
	const posts = await Post.find({})
	res.render('posts/home', { posts });
});

router.get('/new', isLoggedIn, (req, res) => {
	res.render('posts/new');
});

router.get('/:id', isLoggedIn, async (req, res) => {
	const id = req.params.id;
	const post = await Post.findById(id).populate('user');
	if (!post.user) {
		isCreator = false
	} else if (post.user.username === req.user.username) {
		isCreator = true;
	} else {
		isCreator = false
	}
	res.render('posts/show', { post, isCreator });
});

router.post('/', isLoggedIn, async (req, res) => {
	const { title, content } = req.body;
	const newPost = new Post({title, content, user: req.user});
	const user = await User.findById(req.user._id);
	user.articles.push(newPost);
	await newPost.save();
	await user.save()
	res.redirect(`posts/${newPost._id}`);
});

router.delete('/:id', isLoggedIn, async (req, res) => {
	const id = req.params.id;
	await Post.findByIdAndDelete(id);
	res.redirect('/posts')
});

router.get('/:id/edit', isLoggedIn, async (req, res) => {
	const id = req.params.id;
	const post = await Post.findById(id);
	res.render('posts/edit', { post });
})

router.patch('/:id', isLoggedIn, async (req, res) => {
	const { title, content } = req.body;
	const post = await Post.findByIdAndUpdate(req.params.id, { title, content });
	res.redirect(`posts/${post._id}`);
});

router.post('/:id', async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (req.body.liked) {
		post.likes += 1;
	} else {
		post.likes -= 1;
	}
	await post.save();
	res.redirect(`/posts/${post._id}`);
});


module.exports = router;