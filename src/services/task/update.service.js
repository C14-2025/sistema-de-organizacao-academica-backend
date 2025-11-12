export class UpdateTaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute({ taskId, data }) {
    const task = await this.taskRepository.update(taskId, data);
    return { task };
  }
}
