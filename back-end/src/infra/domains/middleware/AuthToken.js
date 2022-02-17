const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const getFileContent = require('../helpers/getFileContent');

const secret = getFileContent('jwt.evaluation.key');
const { JWT_SECRET = secret } = process.env;

dotenv.config();

module.exports = class AuthToken {
  constructor(httpErrors, ErrorCreator) {
    this.token = '';
    this.ErrorCreator = ErrorCreator;
    this.httpErrors = httpErrors;
    this.verifyToken = this.verifyToken.bind(this);
    this.create = this.create.bind(this);
  }

  create(payload) {
      this.token = jwt.sign(
        payload, 
        JWT_SECRET,
        {
          expiresIn: '7d',
          algorithm: 'HS256',
        },
      );
    
      return this.token;
  }

  verifyToken(req, _res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(
        new this.ErrorCreator(this.httpErrors.unauthorized('token not found')),
      );
    }
    const user = AuthToken.checkToken(authorization);
    if (!user) {
      return next(
        new this.ErrorCreator(this.httpErrors.unauthorized('Expired or invalid token')),
      );
    }
    req.user = user;
    return next();
  }

  static checkToken(token) {
    try {
      const user = jwt.verify(token, JWT_SECRET);
      return user;
    } catch (error) {
      return null;
    }
  }
};
