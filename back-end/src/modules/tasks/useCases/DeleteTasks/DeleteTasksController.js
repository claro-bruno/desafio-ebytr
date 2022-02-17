module.exports = class DeleteTasksController {
  constructor(service, StatusCodes) {
    this.useCase = service;
    this.StatusCodes = StatusCodes;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, _next) {
    const { id: taskId } = req.params;
    const { id: userId } = req.user;
    await this.useCase.execute(taskId, userId);
    return res.status(204).send();
  }
};