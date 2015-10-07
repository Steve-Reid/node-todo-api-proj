var express = require('express'),
	bodyParser = require('body-parser'),
	_ = require('underscore'),
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
		matchedTodo = _.findWhere(todos, {id: todoId});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});


// POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}
	
	body.id = todoNextId;
	todoNextId++;

	body.description = body.description.trim();

	todos.push(body);

	res.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10),
		matchedTodo = _.findWhere(todos, {id: todoId});


	if (matchedTodo) {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);

	} else {
		res.status(404).json({"error": "Id not found!"});
	}


		

	

});

app.listen(PORT, function () {
	console.log('Express listening on port: ' + PORT + '!');
});