const express = require('express');
const createError = require('http-errors');
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require('dotenv').config();

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

// Initialize DB
require('./initDB')();

const TodoRoute = require('./Routes/Todo.route');

app.use('/todos', TodoRoute);

//404 handler and pass to error handler
app.use((req, res, next) => {


  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});
