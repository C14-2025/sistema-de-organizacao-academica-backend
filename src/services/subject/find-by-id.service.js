export class FindSubjectByIdService {
  constructor(subjectRepository) {
    this.subjectRepository = subjectRepository;
  }

  async execute(subjectId) {
    const subject = await this.subjectRepository.findById(subjectId);
    return { subject };
  }
}
