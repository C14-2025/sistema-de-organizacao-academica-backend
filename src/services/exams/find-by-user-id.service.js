export class FindByUserIdService {
  constructor(examRepository) {
    this.examRepository = examRepository;
  }

  async execute(userId) {
    const exams = await this.examRepository.findByUserId(userId);
    return { exams };
  }
}
