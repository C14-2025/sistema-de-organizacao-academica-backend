export class FindByIdService {
  constructor(activityRepository) {
    this.activityRepository = activityRepository;
  }

  async execute(activityId) {
    const activity = await this.activityRepository.findById(activityId);
    return { activity };
  }
}
