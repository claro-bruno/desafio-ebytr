const { ObjectId } = require('mongodb');

module.exports = class DeleteTasksUseCase {
  constructor(postsRepository, httpErrors, ErrorCreator) {
    this.repository = postsRepository;
    this.ErrorCreator = ErrorCreator;
    this.httpErrors = httpErrors;
    this.execute = this.execute.bind(this);
  }
  
  async execute(taskId, userId) {
    if (!(ObjectId.isValid(taskId)) || !(ObjectId.isValid(userId))) {
      throw new this.ErrorCreator(
        this.httpErrors.badRequest('postId or userId is not valid'),
      );
    }

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

    await this.repository.remove(taskId);
  }
};