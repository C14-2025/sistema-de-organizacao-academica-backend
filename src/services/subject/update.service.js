export class UpdateSubjectService {
  constructor(subjectRepository) {
    this.subjectRepository = subjectRepository;
  }

  async update(subjectId, data) {
    const { subject } = await this.subjectRepository.findById(subjectId);
    if (!subject) {
      throw new Error("Subject not found.");
    }

    if (data && data.code !== undefined && data.code !== null) {
      const normalized =
        typeof data.code === "string"
          ? data.code.trim().toUpperCase()
          : String(data.code).trim().toUpperCase();
      data.code = normalized;

      const { subject: conflict } =
        await this.subjectRepository.findByCode(normalized);
      if (conflict && conflict.id !== subjectId) {
        throw new Error("Subject code already in use.");
      }
    }

    const { subject: updated } = await this.subjectRepository.update(
      subjectId,
      data,
    );
    return { subject: updated };
  }
}
