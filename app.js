var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const apiRouter = require('./routes/api.js');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}
app.use('/api', apiRouter);

module.exports = app;
