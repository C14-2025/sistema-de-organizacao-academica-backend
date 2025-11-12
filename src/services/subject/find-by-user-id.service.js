export class FindSubjectsByUserIdService {
  constructor(subjectRepository) {
    this.subjectRepository = subjectRepository;
  }

  async execute(userId) {
    const subjects = await this.subjectRepository.findByUserId(userId);
    return subjects;
  }
}
