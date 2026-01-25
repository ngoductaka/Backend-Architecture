const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const compression = require('compression');

const { initDB, instance } = require('./dbs/init.mongodb');

// Initialize the database
// initDB();
const app = express();
// /logging middleware
app.use(morgan('dev'));
// compression middleware
app.use(compression());

morgan.token('body', (req) => JSON.stringify(req.body));app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = app;