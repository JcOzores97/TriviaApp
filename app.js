var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const apiRouter = require('./routes/api.js');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
module.exports = app;
