export class UpdateSubjectService {
  constructor(subjectRepository) {
    this.subjectRepository = subjectRepository;
  }

  async execute({ subjectId, data }) {
    const subject = await this.subjectRepository.update(subjectId, data);
    return { subject };
  }
}