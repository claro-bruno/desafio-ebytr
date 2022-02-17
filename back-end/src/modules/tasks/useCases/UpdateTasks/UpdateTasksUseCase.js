const { ObjectId } = require('mongodb');

module.exports = class UpdateTasksUseCase {
  constructor(tasksRepository, entities, httpErrors, ErrorCreator) {
    this.repository = tasksRepository;
    this.entity = entities;
    this.httpErrors = httpErrors;
    this.ErrorCreator = ErrorCreator;
    this.execute = this.execute.bind(this);
  }
  
  tasksValidations({ taskId, title, description, status, userId }) {
    if (!(ObjectId.isValid(taskId)) || !(ObjectId.isValid(userId))) {
      throw new this.ErrorCreator(this.httpErrors.badRequest('postId or userId is not valid'));
    }
    const validation = this.entity.update({ taskId, userId, title, description, status });
    if ('error' in validation) {
      throw new this.ErrorCreator(this.httpErrors.badRequest(validation.error.message));
    }
  }

  async execute({ taskId, title, description, status, userId }) {
    this.tasksValidations({ taskId, title, description, status, userId });
    const result = await this.repository.getById(taskId);
    if (!result) {
      throw new this.ErrorCreator(
        this.httpErrors.badRequest('Task does not exist'),
      );
    }

    const { userId: user } = result;
    if (userId !== user) {
      throw new this.ErrorCreator(
        this.httpErrors.unauthorized('not authorized to remove'),
      );
    }

    await this.repository.update({ title, description, status, userId }, taskId);
    const task = await this.repository.getById(taskId);
    return task;
  }
};