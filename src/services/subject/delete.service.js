export class DeleteSubjectService {
  constructor(subjectRepository) {
    this.subjectRepository = subjectRepository;
  }

  async execute(subjectId) {
    await this.subjectRepository.delete(subjectId);
  }
}
