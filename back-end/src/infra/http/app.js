const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const rootRouter = require('../routes');
const errorMiddleware = require('../domains/middleware/error');

const app = express();

// middlewares;
app.use(cors());
app.use(bodyParser.json());

// routes;
app.use(rootRouter);

// error middleware;
app.use(errorMiddleware);
module.exports = app;
