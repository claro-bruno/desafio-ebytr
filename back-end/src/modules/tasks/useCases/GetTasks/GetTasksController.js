module.exports = class GetTasksController {
  constructor(service, StatusCodes) {
    this.useCase = service;
    this.StatusCodes = StatusCodes;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, next) {
    try {
      const { id: userId } = req.params; 
      const posts = await this.useCase.execute(userId);
      return res.status(200).json(posts);
    } catch (e) {
      next(e);
    }
  }
};