export class DeleteExamService {
  constructor(examRepository) {
    this.examRepository = examRepository;
  }

  async execute(examId) {
    await this.examRepository.delete(examId);
  }
}