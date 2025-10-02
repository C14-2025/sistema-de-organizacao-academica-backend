import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryWorkRepository } from "../../repositories/in-memory/in-memory-work-repository.js";
import { CreateWorkService } from "./create.service.js";
import { FindByIdService } from "./find-by-id.service.js";

let workRepository;
let createService;
let sut;

describe("Find Work By Id Service", () => {
  beforeEach(() => {
    workRepository = new InMemoryWorkRepository();
    createService = new CreateWorkService(workRepository);
    sut = new FindByIdService(workRepository);
  });

  it("should return a work by id", async () => {
    const { work: createdWork } = await createService.execute({
      title: "API Development",
      userId: 1,
      subjectId: 1,
      deadline: new Date(),
    });

    const { work } = await sut.execute(createdWork.id);

    expect(work).not.toBeNull();
    expect(work.id).toBe(createdWork.id);
  });

  it("should return null if work does not exist", async () => {
    const { work } = await sut.execute(999);
    expect(work).toBeNull();
  });
});