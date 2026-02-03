const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const compression = require("compression");

const { initDB, instance } = require("./dbs/init.mongodb");

// Initialize the database
// initDB();
const app = express();
// /logging middleware
app.use(morgan("dev"));
// compression middleware
app.use(compression());

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);
app.use(express.json());
app.use("/", require("./routes/index"));

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    message: error.message || "Internal Server Error",
    status: "error",
    code: error.code || error.status || 500,
  });
});

module.exports = app;
