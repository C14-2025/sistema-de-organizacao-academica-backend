export class UpdateWorkService {
  constructor(workRepository) {
    this.workRepository = workRepository;
  }

  async execute({ workId, data }) {
  
    const existing = await this.workRepository.findById(workId);
    if (!existing) throw new Error("Work not found.");

    const patch = { ...data };
    Object.keys(patch).forEach((k) => patch[k] === undefined && delete patch[k]);
    delete patch.id;
    delete patch.userId;
    delete patch.subjectId;

    if (typeof patch.title === "string") {
      patch.title = patch.title.trim(); 
    }
    if (typeof patch.description === "string") {
      patch.description = patch.description.trim();
    }

    const updated = await this.workRepository.update(workId, patch);
    return { work: updated };
  }
}