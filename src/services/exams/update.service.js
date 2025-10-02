export class UpdateExamService {
  constructor(examRepository) {
    this.examRepository = examRepository;
  }

  async execute({ examId, data }) {
    const exam = await this.examRepository.update(examId, data);
    return { exam };
  }
}