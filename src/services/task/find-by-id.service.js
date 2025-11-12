export class FindByIdService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId) {
    const task = await this.taskRepository.findById(taskId);
    return { task };
  }
}
