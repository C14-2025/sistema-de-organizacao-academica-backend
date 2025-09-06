import { expect, describe, it, beforeEach } from "vitest";
import { InMemorySubjectRepository } from "../../repositories/in-memory/in-memory-subject-repository.js";
import { CreateSubjectService } from "./create.service.js";
import { FindSubjectByIdService } from "./find-by-id.service.js";

let repo;
let createService;
let sut;

describe("Find Subject By Id Service", () => {
  beforeEach(() => {
    repo = new InMemorySubjectRepository();
    createService = new CreateSubjectService(repo);
    sut = new FindSubjectByIdService(repo);
  });

  it("should return a subject by id", async () => {
    const { subject } = await createService.execute({
      name: "DB",
      code: "DB1",
      professor: "Prof. A",
      userId: 1,
    });

    const response = await sut.execute(subject.id);
    expect(response.subject).not.toBeNull();
    expect(response.subject.id).toBe(subject.id);
  });

  it("should return null if subject does not exist", async () => {
    const response = await sut.execute(999);
    expect(response.subject).toBeNull();
  });
});
