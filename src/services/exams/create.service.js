export class CreateExamService {
  constructor(examRepository) {
    this.examRepository = examRepository;
  }

  async execute(exam) {
    const newExam = await this.examRepository.create(exam);
    return { exam: newExam };
  }
}