const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');

router.get('/register', (req, res) => {
	res.render('user/register');
});

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	const newUser = new User({username, email});
	await User.register(newUser, password);
	req.logIn(newUser, err => {
		if (err) console.log(err);
		res.redirect('/posts');
	});
});

router.get('/login', (req, res) => {
	res.render('user/login');
});

router.post('/login', passport.authenticate('local', { failiureRedirect: '/login' }), async (req, res) => {
	console.log(req.user);
	res.redirect('/posts');
});

router.post('/logout', async (req, res) => {
	req.logout();
	res.redirect('/login');
});

router.get('/profile', isLoggedIn, async (req, res) => {
	console.log(req.session);
	const user = await User.findById(req.session.currentUser._id).populate('articles');
	console.log(user);
	res.render('user/profile', { user });
});

module.exports = router;