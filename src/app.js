const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

const app = express();

app.use(morgan('dev'));
app.use(compression());

morgan.token('body', (req) => JSON.stringify(req.body));app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = app;