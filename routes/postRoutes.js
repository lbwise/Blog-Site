const express = require('express');
const Post = require('../models/Post');
const { isLoggedIn } = require('../middleware'); 
const router = express.Router();

router.get('/', async (req, res) => {
	const posts = await Post.find({})
	res.render('posts/home', { posts });
});

router.get('/new', isLoggedIn, (req, res) => {
	res.render('posts/new');
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const post = await Post.findById(id).populate('user');
	res.render('posts/show', { post });
});

router.post('/', isLoggedIn, async (req, res) => {
	const { title, content } = req.body;
	const newPost = new Post({title, content, user: req.user});
	await newPost.save();
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
	const post = await Post.findByIdAndUpdate(req.params.id, { title: title, content: content});
	res.redirect(`/${post._id}`);
});


module.exports = router;