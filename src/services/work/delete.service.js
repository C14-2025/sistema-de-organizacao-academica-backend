export class DeleteWorkService {
  constructor(workRepository) {
    this.workRepository = workRepository;
  }

  async execute(workId) {
    await this.workRepository.delete(workId);
  }
}
