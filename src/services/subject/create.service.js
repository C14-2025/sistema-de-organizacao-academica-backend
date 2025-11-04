export class CreateSubjectService {
  constructor(subjectRepository) {
    this.subjectRepository = subjectRepository;
  }

  async execute(subject) {
    const newSubject = await this.subjectRepository.create(subject);
    return { subject: newSubject };
  }
}
