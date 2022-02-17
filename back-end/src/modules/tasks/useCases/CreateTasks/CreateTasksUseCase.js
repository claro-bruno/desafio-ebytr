module.exports = class CreateTasksUseCase {
  constructor({ tasksRepository, ErrorCreator, entities, httpErrors }) {
    this.repository = tasksRepository;
    this.ErrorCreator = ErrorCreator;
    this.entity = entities;
    this.httpErrors = httpErrors;
    this.execute = this.execute.bind(this);
  }
  
  async execute(title, description, status = 'pendente', userId) {
    const validation = this.entity.create({ title, description, status, userId });
    if ('error' in validation) {
      throw new this.ErrorCreator(
        this.httpErrors.badRequest(validation.error.message),
      );
    }

    const task = await this.repository.create({ title, description, status, userId });

    return task;
  }
};