module.exports.isLoggedIn = (req, res, next) => {
	req.session.returnTo = req.originalUrl;
	console.log(req.session.returnTo);
	if (!req.user) {
		req.flash('error', 'Please log in first')
		res.redirect('/login');
	} else {
		next();
	}
}