const ErrorCreator = require('../helpers/ErrorCreator');

const errorMiddleware = (err, _req, res, _next) => {
  if (err instanceof ErrorCreator) {
    return res.status(err.status).json({ message: err.message });
  }

  console.log(err);
  res.status(500).json({ message: 'Internal server error' });
};

module.exports = errorMiddleware;
