export class DeleteTaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId) {
    await this.taskRepository.delete(taskId);
  }
}
