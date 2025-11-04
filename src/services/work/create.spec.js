import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryWorkRepository } from "../../repositories/in-memory/in-memory-work-repository.js";
import { CreateWorkService } from "./create.service.js";

let workRepository;
let sut;

describe("Create Work Service", () => {
  beforeEach(() => {
    workRepository = new InMemoryWorkRepository();
    sut = new CreateWorkService(workRepository);
  });

  it("should create a work", async () => {
    const { work } = await sut.execute({
      title: "API Development",
      description: "Develop a REST API for the project",
      deadline: new Date(),
      requirements: "Node.js, Express, Prisma",
      subjectId: 1,
      userId: 1,
    });

    expect(work.id).toBe(1);
    expect(work.title).toBe("API Development");
    expect(work.userId).toBe(1);
  });
});
