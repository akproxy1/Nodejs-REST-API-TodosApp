const createError = require("http-errors");
const mongoose = require("mongoose");

const Todo = require("../Models/Todo.model");

module.exports = {
  getAllTodos: async (req, res, next) => {
    try {
      const results = await Todo.find({}, { __v: 0 });

      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewTodo: async (req, res, next) => {
    try {
      const todo = new Todo(req.body);
      const result = await todo.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findTodoById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const todo = await Todo.findById(id);
      // const todo = await Todo.findOne({ _id: id });
      if (!todo) {
        throw createError(404, "Todo does not exist.");
      }
      res.send(todo);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Todo id"));
        return;
      }
      next(error);
    }
  },

  updateATodo: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Todo.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, "Todo does not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, "Invalid Todo Id"));
      }

      next(error);
    }
  },

  deleteATodo: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Todo.findByIdAndDelete(id);
      // console.log(result);
      if (!result) {
        throw createError(404, "Todo does not exist.");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, "Invalid Todo id"));
        return;
      }
      next(error);
    }
  },
};
