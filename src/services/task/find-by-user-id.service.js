export class FindByUserIdService {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(userId) {
    const activities = await this.taskRepository.findByUserId(userId);
    return { activities };
  }
}
