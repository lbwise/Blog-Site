const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('passport');
const LocalStrat = require('passport-local');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const chalk = require('chalk');
const path = require('path');
const flash = require('connect-flash');
const connectDb = require('./utils/connectDb');
const app = express();
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');
const PORT = 3000

connectDb();

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use(bodyParser.json());
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
	saveUninitialized: true,
	secret: 'archie100',
	resave: false,
	cookie: {
		httpOnly: true,
		expires: Date.now() + 604800000,
	}
}

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrat(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('successs');
	res.locals.error = req.flash('error');
	next();
});

app.use('/', userRoutes);
app.use('/posts', postRoutes);

app.use((req, res, next) => {
	res.render('404');
});

app.listen(PORT, () => {
	console.log(chalk.blueBright(`LISTENING ON PORT: ${PORT}`));
});