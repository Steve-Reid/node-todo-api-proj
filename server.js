var express = require('express'),
	app = express(),
	PORT = process.env.PORT || 3000;

var todos = [{
	id: 1,
	description: 'Video tango class',
	completed: false
}, {
	id: 2,
	description: 'Edit tango videos',
	completed: false
}, {
	id: 3,
	description: 'Transfer Phil\'s domain name',
	completed: true
}];

	app.get('/', function (req, res) {
		res.send('Todo API Root');
	});

	// GET /todos
	app.get('/todos', function (req, res) {
		res.json(todos);
	});

	// GET /todos/:id
	app.get('/todos/:id', function (req, res) {
		var todoId = parseInt(req.params.id, 10),
			matchedTodo;

		todos.forEach(function (todo) {
			if (todoId === todo.id) {
				matchedTodo = todo;
			}
		});

		if (matchedTodo) {
			res.json(matchedTodo);
		} else {
			res.status(404).send();
		}
	});

	app.listen(PORT, function () {
		console.log('Express listening on port: ' + PORT + '!');
	});