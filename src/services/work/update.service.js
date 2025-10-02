export class UpdateWorkService {
  constructor(workRepository) {
    this.workRepository = workRepository;
  }

  async execute({ workId, data }) {
    const work = await this.workRepository.update(workId, data);
    return { work };
  }
}