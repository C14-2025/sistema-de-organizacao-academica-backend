import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryWorkRepository } from "../../repositories/in-memory/in-memory-work-repository.js";
import { CreateWorkService } from "./create.service.js";
import { DeleteWorkService } from "./delete.service.js";

let workRepository;
let createService;
let sut;

describe("Delete Work Service", () => {
  beforeEach(() => {
    workRepository = new InMemoryWorkRepository();
    createService = new CreateWorkService(workRepository);
    sut = new DeleteWorkService(workRepository);
  });

  it("should delete a work", async () => {
    const { work } = await createService.execute({
      title: "API Development",
      userId: 1,
      subjectId: 1,
      deadline: new Date(),
    });

    await sut.execute(work.id);

    const deletedWork = await workRepository.findById(work.id);
    expect(deletedWork).toBeNull();
  });

  it("should throw an error if work does not exist", async () => {
    await expect(sut.execute(999)).rejects.toThrow("Work not found.");
  });
});