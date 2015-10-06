var express = require('express'),
	app = express(),
	PORT = process.env.PORT || 3000;

	app.get('/', function (req, res) {
		res.send('Todo API Root');
	});

	app.listen(PORT, function () {
		console.log('Express listening on port: ' + PORT + '!');
	});