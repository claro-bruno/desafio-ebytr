module.exports = class CreateLoginUseCase {
  constructor({ userRepository, ErrorCreator, entity, httpErrors, authToken }) {
    this.authToken = authToken;
    this.repository = userRepository;
    this.entity = entity;
    this.httpErrors = httpErrors;
    this.ErrorCreator = ErrorCreator;
    this.execute = this.execute.bind(this);
  }
  
  async execute(email, password) {
    const validation = this.entity.login({ email, password });
    if ('error' in validation) {
      throw new this.ErrorCreator(
        this.httpErrors.badRequest(validation.error.message),
      );
    }
    const checkedEmail = await this.repository.find({ email, password });
    if (!checkedEmail) {
      throw new this.ErrorCreator(
        this.httpErrors.notFound('email or password invalid'),
      );
    }
    const { _id: id, name, role } = checkedEmail;
    const token = this.authToken.create({ id, name, email, role });
    return { token, id, name, email, role };
  }
};