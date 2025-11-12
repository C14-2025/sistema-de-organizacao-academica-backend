export class CreateTaskService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(task) {
    const newTask = await this.taskRepository.create(task);
    return { task: newTask };
  }
}
