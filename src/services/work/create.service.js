export class CreateWorkService {
  constructor(workRepository) {
    this.workRepository = workRepository;
  }

  async execute(work) {
    const newWork = await this.workRepository.create(work);
    return { work: newWork };
  }
}
