import { expect, describe, it, beforeEach } from "vitest";
import { InMemorySubjectRepository } from "../../repositories/in-memory/in-memory-subject-repository.js";
import { CreateSubjectService } from "./create.service.js";
import { UpdateSubjectService } from "./update.service.js";

let repo;
let createService;
let sut;

describe("Update Subject Service", () => {
  beforeEach(() => {
    repo = new InMemorySubjectRepository();
    createService = new CreateSubjectService(repo);
    sut = new UpdateSubjectService(repo);
  });

  it("should update an existing subject", async () => {
    const { subject } = await createService.execute({
      name: "OS",
      code: "SO1",
      professor: "Prof. B",
      userId: 1,
    });

    const response = await sut.execute({
      subjectId: subject.id,
      data: { name: "Operating Systems", code: "OS1" },
    });

    expect(response.subject.id).toBe(subject.id);
    expect(response.subject.name).toBe("Operating Systems");
    expect(response.subject.code).toBe("OS1");
  });

  it("should throw error if subject does not exist", async () => {
    await expect(
      sut.execute({ subjectId: 999, data: { name: "Not Found" } })
    ).rejects.toThrow("Subject not found.");
  });
});
