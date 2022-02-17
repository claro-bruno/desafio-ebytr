module.exports = class CreateLoginController {
  constructor(loginService) {
    this.service = loginService;
    this.handle = this.handle.bind(this);
  }

  async handle(req, res, _next) {
    const { email, password } = req.body;
    const user = await this.service.execute(email, password);
      
    return res.status(200).json({ user });
  }
};