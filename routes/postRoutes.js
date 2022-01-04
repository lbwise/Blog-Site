const express = require('express');
const Post = require('../models/Post'); 
const router = express.Router();

router.get('/', async (req, res) => {
	const posts = await Post.find({})
	res.render('posts/home', { posts });
});

router.get('/new', (req, res) => {
	res.render('posts/new');
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const post = await Post.findById(id);
	res.render('posts/show', { post });
});

router.post('/', async (req, res) => {
	const newPostData = req.body;
	const newPost = new Post(newPostData);
	await newPost.save();
	res.redirect(`/${newPost._id}`);
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	await Post.findByIdAndDelete(id);
	res.redirect('/')
});

router.get('/:id/edit', async (req, res) => {
	const id = req.params.id;
	const post = await Post.findById(id);
	res.render('posts/edit', { post });
})

router.patch('/:id', async (req, res) => {
	const { title, content } = req.body;
	const post = await Post.findByIdAndUpdate(req.params.id, { title: title, content: content});
	res.redirect(`/${post._id}`);
});

router.get('/:id', async (req, res) => {
	const id = req.params.id;
	const post = await Post.findById(id);
	res.render('posts/show', { post });
});

module.exports = router;