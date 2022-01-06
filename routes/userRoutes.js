const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/register', (req, res) => {
	res.render('user/register');
});

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	const newUser = new User({username, email});
	await User.register(newUser, password);
	console.log('saved', newUser);
	res.redirect('/posts');
});

router.get('/login', (req, res) => {
	res.render('user/login');
});

router.post('/login', passport.authenticate('local', { failiureRedirect: '/login' }), async (req, res) => {
	console.log(req.user);
	res.redirect('/posts');
});

module.exports = router;