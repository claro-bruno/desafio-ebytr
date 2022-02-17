module.exports = class CreateUserUseCase {
  constructor({ userRepository, userEntity, ErrorCreator, httpErrors }) {
    this.repository = userRepository;
    this.entity = userEntity;
    this.httpErrors = httpErrors;
    this.ErrorCreator = ErrorCreator;
    this.execute = this.execute.bind(this);
  }
  
  async execute(name, email, password, role = 'user') {
    const validation = this.entity.create({ name, email, password, role });
    if ('error' in validation) {
      throw new this.ErrorCreator(
        this.httpErrors.badRequest(validation.error.message),
      );
    }
    const checkedEmail = await this.repository.find({ email });
    if (checkedEmail) {
      throw new this.ErrorCreator(
        this.httpErrors.conflict('user'),
      );
    }
    const result = await this.repository.create({ name, email, password, role });
    return { password, ...result };
  }
};