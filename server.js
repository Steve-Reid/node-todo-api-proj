var express = require('express'),
	bodyParser = require('body-parser'),
	_ = require('underscore'),
	bcrypt = require('bcrypt'),
	db =require('./db.js'),
	middleware = require('./middleware.js')(db),
	app = express(),
	PORT = process.env.PORT || 3000;

var todos = [],
	todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

// GET /todos?completed=true
app.get('/todos', middleware.requireAuthentication, function (req, res) {
	var query = req.query,
		where = {};

	if (query.hasOwnProperty('completed') && query.completed === 'true') {
		where.completed = true;
	} else if (query.hasOwnProperty('completed') && query.completed === 'false') {
		where.completed = false;
	}

	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where.description = {
			$like: '%' + query.q + '%'
		};
	}

	db.todo.findAll({where: where}).then(function (todos) {
		res.json(todos);
	}, function (e) {
		res.status(500).send();
	});
});

// GET /todos/:id
app.get('/todos/:id', middleware.requireAuthentication, function (req, res) {
	var todoId = parseInt(req.params.id, 10);

	db.todo.findById(todoId).then(function (todo) {
		if (!!todo) {
			res.json(todo.toJSON());
		} else {
			res.status(404).send();
		}
	}, function (e) {
		res.status(500).send();
	});
});


// POST /todos
app.post('/todos', middleware.requireAuthentication, function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	db.todo.create(body).then(function (todo) {
		res.json(todo.toJSON());
	}, function (e) {
		res.status(400).json(e);
	});
});

// DELETE /todos/:id
app.delete('/todos/:id', middleware.requireAuthentication, function (req, res) {
	var todoId = parseInt(req.params.id, 10),
		cachedTodo;

	db.todo.findById(todoId).then(function(todo){
	  if (todo) {
	    cachedTodo = todo;
	    return todo.destroy();
	  } else {
	    res.status(404).send('Unable to delete');
	  }
	}).then(function(rows){
	    res.json(cachedTodo);
	}).catch(function(){
	    res.status(500).send();
	});
});

// PUT /todos/:id
app.put('/todos/:id', middleware.requireAuthentication, function (req, res) {
	var todoId = parseInt(req.params.id, 10),
		body = _.pick(req.body, 'description', 'completed'),
		attributes = {};

	if (body.hasOwnProperty('completed')) {
		attributes.completed = body.completed;
	} 

	if (body.hasOwnProperty('description')) {
		attributes.description = body.description;
	} 

	db.todo.findById(todoId).then(function (todo) {
		if (todo) {
			todo.update(attributes).then(function (todo) {
				res.json(todo.toJSON());
			}, function (e) {
				res.status(400).json(e);
			});
		} else {
			res.status(404).send();
		}
	}, function () {
		res.status(500).send();
	});
});

 // POST /users
 app.post('/users', function (req, res) {
 	var body = _.pick(req.body, 'email', 'password');


 	db.user.create(body).then(function (user) {
 		res.json(user.toPublicJSON());
 	}, function (e) {
 		res.status(400).json(e);
 	});
 });

 // POST /users/login

 app.post('/users/login', function (req, res) {
 	var body = _.pick(req.body, 'email', 'password');

 	db.user.authenticate(body).then(function(user) {
 		var token = user.generateToken('authentication');

 		if (token) {
 			res.header('Auth', token).json(user.toPublicJSON());
 		} else {
 			res.status(401).send();
 		}
 		
 	}, function () {
 		res.status(401).send();
 	});






 });

db.sequelize.sync({force: true}).then(function () {
	app.listen(PORT, function () {
		console.log('Express listening on port: ' + PORT + '!');
	});	
});

