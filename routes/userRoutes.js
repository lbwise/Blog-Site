const express = require('express');
const router = express.Router();
const User = requre('../models/User');

router.get('/register', (req, res) => {
	res.render('user/register');
});

router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
	const newUser = User.register({ username, email }, password);
	console.log(newUser);
	
});