const { StatusCodes } = require('http-status-codes');

const UsersRepository = require('../../modules/users/repositories/UsersRepository');

const { 
  CreateUserUseCase, 
  CreateUserController, 
} = require('../../modules/users/useCases/CreateUser');
const { 
  CreateLoginUseCase,
  CreateLoginController,
} = require('../../modules/users/useCases/LoginUser');

const ErrorCreator = require('./helpers/ErrorCreator');
const httpErrors = require('./helpers/httpErrors');
const AuthToken = require('./middleware/AuthToken');

const {
  userValidator,
  loginUserValidator,
} = require('../entities/user');

// repositories;
const userRepository = new UsersRepository();

// Auth Token Middleware
const authToken = new AuthToken(httpErrors, ErrorCreator);

// validators;
const entities = {
  create: userValidator,
  login: loginUserValidator,
};

// use cases;
const createUserUseCase = new CreateUserUseCase({
  userRepository,
  userEntity: entities,
  ErrorCreator,
  httpErrors,
});

const createLoginUseCase = new CreateLoginUseCase({
  userRepository,
  ErrorCreator,
  entity: entities,
  httpErrors,
  authToken,
});

// controllers;
const createUserController = new CreateUserController(createUserUseCase, StatusCodes);
const createLoginController = new CreateLoginController(createLoginUseCase, StatusCodes);

class UserDomain {
  constructor() {  
    this.create = createUserController;
    this.login = createLoginController;
  }
}

module.exports = UserDomain;
