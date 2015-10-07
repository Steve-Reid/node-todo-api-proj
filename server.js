var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	PORT = process.env.PORT || 3000;

var todos = [],
	todoNextId = 1;

	app.use(bodyParser.json());

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


	// POST /todos
	app.post('/todos', function (req, res) {
		var body = req.body;

		// add Id field
		body.id = todoNextId;
		// push body into array
		todos.push(body);
		todoNextId++;
		console.log('todoNextId: ' + todoNextId);
		

		res.json(body);
	});



	app.listen(PORT, function () {
		console.log('Express listening on port: ' + PORT + '!');
	});