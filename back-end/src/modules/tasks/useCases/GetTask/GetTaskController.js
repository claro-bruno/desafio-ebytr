module.exports = class GetTaskController {
  constructor(service, StatusCodes) {
    this.useCase = service;
    this.StatusCodes = StatusCodes;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, _next) {
    const { id } = req.params;
    const task = await this.useCase.execute(id);
    return res.status(200).json({ task });
  }
};