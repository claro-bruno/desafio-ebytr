const { Router } = require('express');
const UserDomain = require('../domains/UserDomain');
const TaskDomain = require('../domains/TaskDomain');
const authToken = require('../domains/middleware/AuthToken');
const UserRoute = require('./UserRoute');
const TaskRoute = require('./TaskRoute');

const rootRouter = Router({ mergeParams: true });
const userRouter = Router();
const taskRouter = Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/tasks', taskRouter);

const userDomain = new UserDomain();
const taskDomain = new TaskDomain();

const userRoute = new UserRoute(userRouter, userDomain, authToken);
userRoute.handle();

const taskRoute = new TaskRoute(taskRouter, taskDomain, taskDomain.auth);
taskRoute.handle();

module.exports = rootRouter;
