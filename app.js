var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var recipes = require('./routes/recipes');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/recipes', recipes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 400);
		res.json({
			error: err.message
		});
	});
}

// production error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 400);
	res.json({
		error: err.message
	});
});

module.exports = app;
