const { ObjectId } = require('mongodb');

module.exports = class GetTaskUseCase {
  constructor(tasksRepository, httpErrors, ErrorCreator) {
    this.repository = tasksRepository;
    this.httpErrors = httpErrors;
    this.ErrorCreator = ErrorCreator;
    this.execute = this.execute.bind(this);
  }
  
  async execute(id) {
    if (!(ObjectId.isValid(id))) {
      throw new this.ErrorCreator(
        this.httpErrors.badRequest('id is not valid'),
      );
    }
    const task = await this.repository.getById(id);
    if (!task) {
      throw new this.ErrorCreator(
        this.httpErrors.badRequest('Task does not exist'),
      );
    }
    return task;
  }
};