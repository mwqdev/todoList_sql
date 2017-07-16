const express = require('express');
const router = express.Router();

const models = require('../models');

let data = {
	title: "Todo List"
}

router.get('/', (req, res) => {
	models.Todo.findAll({where:{complete:false}})
	.then((todos) => {
		data.todos = todos;
	})
	.then(() => {
		models.Todo.findAll({where:{complete:true}})
		.then((complete) => {
			data.complete = complete;
			res.render('index', data);
		});
	});
});

router.post('/', (req, res) => {
	let newTask = req.body.newTask;
	let todo = models.Todo.build({
		name: newTask,
		complete: false
	});
	todo.save().then(() => {
		res.redirect('/');
	});
});

router.post('/clear', (req, res) => {
	models.Todo.destroy({where:{complete:true}})
	.then(() => {
		res.redirect('/');
	});
});

router.post('/:id', (req, res) => {
	let todoId = req.params.id;
	models.Todo.findOne({where:{id:todoId}})
	.then((todo) => {
		todo.update({complete: true})
		.then(() => {
			res.redirect('/');
		});
	});
});

module.exports = router;
