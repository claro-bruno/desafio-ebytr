module.exports = class CreateUserController {
  constructor(userService, StatusCodes) {
    this.service = userService;
    this.StatusCodes = StatusCodes;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, _next) {
    const { name, email, password, role = 'user' } = req.body;
    const user = await this.service.execute(name, email, password, role);
    return res.status(201).json({ user });
  }
};