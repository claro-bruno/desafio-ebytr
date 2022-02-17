const rescue = require('express-rescue');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthMiddlware = require('../../../middleware/AuthMiddleware');

const ValidateTokenUseCase = require('../../../useCases/auth/ValidateTokenUseCase');
const VerifyUserUseCase = require('../../../useCases/user/VerifyUserUseCase');

const UserRepository = require('../../../repository/UserRepository');

const { User } = require('../../../database/models');

const getFileContent = require('../../../utils/getFileContent');

const ErrorCreator = require('../../../helpers/ErrorCreator');
const httpErrors = require('../../../helpers/httpErrors');

const secret = getFileContent('jwt.evaluation.key');
const { JWT_SECRET = secret } = process.env;

// repositories;
const userRepository = new UserRepository({
  model: User,
  httpErrors,
  ErrorCreator,
});

// use cases;
const validateTokenUseCase = new ValidateTokenUseCase({
  jwt,
  secret: JWT_SECRET,
  httpErrors,
  ErrorCreator,
});

const verifyUserUseCase = new VerifyUserUseCase({
  repository: userRepository,
  httpErrors,
  ErrorCreator,
});

// middleware;
const authMiddlware = new AuthMiddlware({
  useCase: validateTokenUseCase,
  verifyUserUseCase,
  httpErrors,
  ErrorCreator,
});

module.exports = rescue(authMiddlware.handle);
