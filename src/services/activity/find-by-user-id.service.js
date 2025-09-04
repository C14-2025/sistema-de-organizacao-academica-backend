export class FindByUserIdService {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute(userId) {
    const activities = await this.activityRepository.findByUserId(userId);
    return { activities };
  }
}