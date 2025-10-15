import { expect, describe, it, beforeEach } from "vitest";
import { InMemorySubjectRepository } from "../../repositories/in-memory/in-memory-subject-repository.js";
import { CreateSubjectService } from "./create.service.js";
import { DeleteSubjectService } from "./delete.service.js";
import { FindSubjectsByUserIdService } from "./find-by-user-id.service.js";

let repo;
let createService;
let deleteService;
let listService;

describe("Delete Subject Service", () => {
  beforeEach(() => {
    repo = new InMemorySubjectRepository();
    createService = new CreateSubjectService(repo);
    deleteService = new DeleteSubjectService(repo);
    listService = new FindSubjectsByUserIdService(repo);
  });

  it("should delete a subject", async () => {
    const { subject } = await createService.execute({
      name: "Networks",
      code: "NET1",
      professor: "Prof. C",
      userId: 1,
    });

    await deleteService.execute(subject.id);

    const { subjects } = await listService.execute(1);
    expect(subjects.length).toBe(0);
  });

  it("should throw error if subject does not exist", async () => {
    await expect(deleteService.execute(999)).rejects.toThrow(
      "Subject not found.",
    );
  });
});
