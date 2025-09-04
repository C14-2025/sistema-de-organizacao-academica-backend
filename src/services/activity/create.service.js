export class CreateActivityService {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute(activity) {
    const newActivity = await this.activityRepository.create(activity);
    return { activity: newActivity };
  }
}