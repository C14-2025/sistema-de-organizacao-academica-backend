export class InMemorySubjectRepository {
  subjects = [];

  async create(subject) {
    const newSubject = {
      id: this.subjects.length + 1,
      ...subject,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.subjects.push(newSubject);
    return newSubject;
  }

  async update(subjectId, subject) {
    const existing = this.subjects.find((s) => s.id === subjectId);
    if (!existing) {
      throw new Error("Subject not found.");
    }

    const updated = {
      ...existing,
      ...subject,
      updatedAt: new Date(),
    };

    this.subjects = this.subjects.map((s) =>
      s.id === subjectId ? updated : s,
    );
    return updated;
  }

  async delete(subjectId) {
    const index = this.subjects.findIndex((s) => s.id === subjectId);
    if (index === -1) {
      throw new Error("Subject not found.");
    }
    this.subjects.splice(index, 1);
  }

  async findById(subjectId) {
    const subject = this.subjects.find((s) => s.id === subjectId);
    return subject || null;
  }

  async findByUserId(userId) {
    return this.subjects.filter((s) => s.userId === userId);
  }
}
