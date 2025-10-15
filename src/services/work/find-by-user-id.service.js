export class FindWorksByUserIdService {
  constructor(workRepository) {
    this.workRepository = workRepository;
  }

  async execute(userId) {
    const works = await this.workRepository.findByUserId(userId);
    return { works };
  }
}
