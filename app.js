const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const methodOverride = require('method-override');
const chalk = require('chalk');
const path = require('path');
const connectDb = require('./utils/connectDb');
const app = express();
const postRoutes = require('./routes/postRoutes');
const PORT = 3000

connectDb();

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/posts', postRoutes);

app.use((req, res, next) => {
	res.render('404');
});

app.listen(PORT, () => {
	console.log(chalk.blueBright(`LISTENING ON PORT: ${PORT}`));
});