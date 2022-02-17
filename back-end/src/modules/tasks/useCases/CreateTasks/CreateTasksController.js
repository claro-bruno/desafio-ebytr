module.exports = class CreateTasksController {
  constructor(postUseCase, StatusCodes) {
    this.useCase = postUseCase;
    this.StatusCodes = StatusCodes;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, _next) {
    const { title, description, status = 'pendente' } = req.body;
    const { id: userId } = req.user;
    const task = await this.useCase.execute(title, description, status, userId);
        
    return res.status(201).json({ task });
  }
};