export class UpdateSubjectService {
  constructor(subjectRepository) {
    this.subjectRepository = subjectRepository;
  }

  async execute({ subjectId, data }) {
    const { subject } = await this.subjectRepository.findById(subjectId);
    if (!subject) {
      const e = new Error("SUBJECT_NOT_FOUND");
      e.code = "P2025";
      throw e;
    }

    if (data && data.code !== undefined && data.code !== null) {
      const normalized = String(data.code).trim().toUpperCase();
      data.code = normalized;

      const { subject: conflict } =
        await this.subjectRepository.findByCode(normalized);
      if (conflict && conflict.id !== subjectId) {
        const e = new Error("SUBJECT_CODE_ALREADY_EXISTS");
        e.code = "P2002";
        throw e;
      }
    }

    const { subject: updated } = await this.subjectRepository.update(
      subjectId,
      data,
    );
    return { subject: updated };
  }
}
