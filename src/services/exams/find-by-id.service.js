export class FindByIdService {
  constructor(examRepository) {
    this.examRepository = examRepository;
  }

  async execute(examId) {
    const exam = await this.examRepository.findById(examId);
    return { exam };
  }
}
