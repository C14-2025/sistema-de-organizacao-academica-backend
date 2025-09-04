export class DeleteActivityService {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute(activityId) {
    await this.activityRepository.delete(activityId);
  }
}