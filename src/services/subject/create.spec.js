import { expect, describe, it, beforeEach } from "vitest";
import { InMemorySubjectRepository } from "../../repositories/in-memory/in-memory-subject-repository.js";
import { CreateSubjectService } from "./create.service.js";

let repo;
let sut;

describe("Create Subject Service", () => {
  beforeEach(() => {
    repo = new InMemorySubjectRepository();
    sut = new CreateSubjectService(repo);
  });

  it("should create a subject", async () => {
    const { subject } = await sut.execute({
      name: "Algorithms I",
      code: "ALG1",
      professor: "Christopher",
      schedule: "Mon 10:00",
      userId: 1,
    });

    expect(subject.id).toBe(1);
    expect(subject.name).toBe("Algorithms I");
    expect(subject.code).toBe("ALG1");
    expect(subject.userId).toBe(1);
  });
});
