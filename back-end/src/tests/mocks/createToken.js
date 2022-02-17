const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwtSecret');

module.exports = (payload) => {
  const jwtOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  return jwt.sign({ data: payload }, jwtSecret, jwtOptions);
};