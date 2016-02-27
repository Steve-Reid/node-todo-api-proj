var Sequelize = require('sequelize'),
	sequelize = new Sequelize(undefined, undefined, undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '/basic-sqlite-database.sqlite'
	});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1,250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({
	// force: true
}).then(function () {
	console.log('Everything is synced');

	Todo.findById(1).then(function (todo) {
		if (todo) {
			console.log(todo.toJSON());
		} else {
			console.log('todo not found!');
		}
	});


	// Todo.create({
	// 	description: 'Make Dinner'
	// }).then(function (todo) {
	// 	return Todo.create({
	// 		description: 'Put bike in car for work'
	// 	});
	// }).then(function () {
	// 	// return Todo.findById(1);
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like: '%Bike%'
	// 			}
	// 		}
	// 	});
	// }).then(function (todos) {
	// 	if (todos) {
	// 		todos.forEach(function (todo) {
	// 			console.log(todo.toJSON());
	// 		});		
	// 	} else {
	// 		console.log('no todos found!');
	// 	}
	// }).catch(function (e) {
	// 	console.log(e);
	// });
});