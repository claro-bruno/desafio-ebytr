const { StatusCodes } = require('http-status-codes');

const TasksRepository = require('../../modules/tasks/repositories/TasksRepository');

const { 
  CreateTasksUseCase, 
  CreateTasksController,
} = require('../../modules/tasks/useCases/CreateTasks');

const { 
  GetTasksUseCase, 
  GetTasksController,
} = require('../../modules/tasks/useCases/GetTasks');

const { 
  GetTaskUseCase, 
  GetTaskController,
} = require('../../modules/tasks/useCases/GetTask');

const { 
  DeleteTasksUseCase, 
  DeleteTasksController, 
} = require('../../modules/tasks/useCases/DeleteTasks');

const { 
  UpdateTasksUseCase, 
  UpdateTasksController,
 } = require('../../modules/tasks/useCases/UpdateTasks');

const ErrorCreator = require('./helpers/ErrorCreator');
const httpErrors = require('./helpers/httpErrors');
const AuthToken = require('./middleware/AuthToken');

// Auth Token Middleware
const authToken = new AuthToken(httpErrors, ErrorCreator);

const {
  taskValidator,
  updateTaskValidator,
} = require('../entities/tasks');

// repositories;
const tasksRepository = new TasksRepository();

// validators;
const entities = {
  create: taskValidator,
  update: updateTaskValidator,
};

// use cases;
const createTasksUseCase = new CreateTasksUseCase({
  tasksRepository,
  entities,
  httpErrors,
  ErrorCreator,
});

const getTasksUseCase = new GetTasksUseCase(
  tasksRepository,
);

const getTaskUseCase = new GetTaskUseCase(
  tasksRepository,
  httpErrors,
  ErrorCreator,
);

const deleteTaskUseCase = new DeleteTasksUseCase(
  tasksRepository,
  httpErrors,
  ErrorCreator,
);

const updateTasksUseCase = new UpdateTasksUseCase(
  tasksRepository,
  entities,
  httpErrors,
  ErrorCreator,
);

// controllers;
const createTasksController = new CreateTasksController(createTasksUseCase, StatusCodes);
const getTasksController = new GetTasksController(getTasksUseCase, StatusCodes);
const getTaskController = new GetTaskController(getTaskUseCase, StatusCodes);
const deleteTaskController = new DeleteTasksController(deleteTaskUseCase, StatusCodes);
const updateTasksController = new UpdateTasksController(updateTasksUseCase, StatusCodes);

class TaskDomain {
  constructor() {  
    this.create = createTasksController;
    this.auth = authToken;
    this.getAll = getTasksController;
    this.getById = getTaskController;
    this.remove = deleteTaskController;
    this.update = updateTasksController;
  }
}

module.exports = TaskDomain;
