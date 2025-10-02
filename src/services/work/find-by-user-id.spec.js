import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryWorkRepository } from "../../repositories/in-memory/in-memory-work-repository.js";
import { CreateWorkService } from "./create.service.js";
import { FindWorksByUserIdService } from "./find-by-user-id.service.js";

let workRepository;
let createService;
let sut;

describe("Find Works By User Id Service", () => {
  beforeEach(() => {
    workRepository = new InMemoryWorkRepository();
    createService = new CreateWorkService(workRepository);
    sut = new FindWorksByUserIdService(workRepository);
  });

  it("should return all works for a user", async () => {
    await createService.execute({ title: "Work 1", userId: 1, subjectId: 1, deadline: new Date() });
    await createService.execute({ title: "Work 2", userId: 1, subjectId: 2, deadline: new Date() });
    await createService.execute({ title: "Work 3", userId: 2, subjectId: 1, deadline: new Date() });

    const { works } = await sut.execute(1);

    expect(works).toHaveLength(2);
    expect(works[0].title).toBe("Work 1");
    expect(works[1].title).toBe("Work 2");
  });
});