module.exports = class GetTasksUseCase {
  constructor(tasksRepository) {
    this.repository = tasksRepository;
    this.execute = this.execute.bind(this);
  }
  
  async execute(userId) {
    const tasks = await this.repository.getAll(userId);
    return tasks;
  }
};