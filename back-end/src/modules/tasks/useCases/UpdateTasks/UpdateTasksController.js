module.exports = class UpdateTasksController {
  constructor(postUseCase, StatusCodes) {
    this.useCase = postUseCase;
    this.StatusCodes = StatusCodes;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, _next) {
    const { title, description, status } = req.body;
    const { id: userId } = req.user;
    const { id: taskId } = req.params;
    const task = await this.useCase.execute({ taskId, title, description, status, userId });
      
    return res.status(200).json({ task });
  }
};