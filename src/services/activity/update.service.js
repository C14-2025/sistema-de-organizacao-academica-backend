export class UpdateActivityService {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute({ activityId, data }) {
    const activity = await this.activityRepository.update(activityId, data);
    return { activity };
  }
}