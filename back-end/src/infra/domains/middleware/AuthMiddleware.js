class AuthMiddlware {
  constructor({ useCase, verifyUserUseCase, httpErrors, ErrorCreator }) {
    this.useCase = useCase;
    this.verifyUserUseCase = verifyUserUseCase;
    this.httpErrors = httpErrors;
    this.ErrorCreator = ErrorCreator;

    this.handle = this.handle.bind(this);
  }

  async handle(req, _res, next) {
    const { authorization: token } = req.headers;
    if (!token) {
      return next(
        new this.ErrorCreator(this.httpErrors.unauthorized('token not found')),
      );
    }

    const userData = this.useCase.execute(token);
    const verifiedUser = await this.verifyUserUseCase.execute(userData);
    
    req.user = verifiedUser;
    next();
  }
}

module.exports = AuthMiddlware;
