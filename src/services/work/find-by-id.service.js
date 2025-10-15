export class FindWorkByIdService {
  constructor(workRepository) {
    this.workRepository = workRepository;
  }

  async execute(workId) {
    const work = await this.workRepository.findById(workId);
    return { work };
  }
}
