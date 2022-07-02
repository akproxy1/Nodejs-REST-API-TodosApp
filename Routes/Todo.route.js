const express = require('express');
const router = express.Router();

const TodoController = require('../Controllers/Todo.Controller');

//Get a list of all todos
router.get('/', TodoController.getAllTodos);

//Create a new todo
router.post('/', TodoController.createNewTodo);

//Get a todo by id
router.get('/:id', TodoController.findTodoById);

//Update a todo by id
router.patch('/:id', TodoController.updateATodo);

//Delete a todo by id
router.delete('/:id', TodoController.deleteATodo);

module.exports = router;
