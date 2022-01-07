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
		req.flash('success', `Welcome back`)
		res.redirect('/posts');
	});
});

router.get('/login', (req, res) => {
	res.render('user/login');
});

router.post('/login', passport.authenticate('local', { failiureFalsh: 'error', failiureRedirect: '/login' }), async (req, res) => {
	const path = req.session.returnTo || '/posts'
	req.flash('success', `Welcome back ${req.user.username}`)
	res.redirect(path);
});

router.post('/logout', async (req, res) => {
	req.logout();
	res.redirect('/login');
});

router.get('/profile', isLoggedIn, async (req, res) => {
	res.render('user/profile');
});

module.exports = router;