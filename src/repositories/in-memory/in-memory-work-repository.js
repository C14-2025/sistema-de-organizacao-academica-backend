export class InMemoryWorkRepository {
  works = [];

  async create(work) {
    const newWork = {
      id: this.works.length + 1,
      ...work,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.works.push(newWork);
    return newWork;
  }

  async update(workId, work) {
    const existingWork = this.works.find((w) => w.id === workId);

    if (!existingWork) {
      throw new Error("Work not found.");
    }

    const updatedWork = {
      ...existingWork,
      ...work,
      updatedAt: new Date(),
    };

    this.works = this.works.map((w) => (w.id === workId ? updatedWork : w));
    return updatedWork;
  }

  async delete(workId) {
    const index = this.works.findIndex((w) => w.id === workId);
    if (index === -1) {
      throw new Error("Work not found.");
    }
    this.works.splice(index, 1);
  }

  async findById(workId) {
    const work = this.works.find((w) => w.id === workId);
    return work || null;
  }

  async findByUserId(userId) {
    return this.works.filter((w) => w.userId === userId);
  }
}
