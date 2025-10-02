import { expect, describe, it, beforeEach} from "vitest";
import { InMemoryWorkRepository } from "../../repositories/in-memory/in-memory-work-repository.js";
import { UpdateWorkService } from "./update.service.js";

let workRepository;
let sut;

describe("Update Work Service", () => {
  beforeEach(() => {
    workRepository = new InMemoryWorkRepository();
    sut = new UpdateWorkService(workRepository);
  });

  it("should update an existing work", async () => {
    const createdWork = await workRepository.create({
      title: "Initial Title",
      description: "Initial Description",
      userId: 1,
      subjectId: 1,
      deadline: new Date(),
    });

    const updatedData = {
      title: "Updated Title",
      description: "Updated Description",
    };

    const { work } = await sut.execute({
      workId: createdWork.id,
      data: updatedData,
    });

    expect(work.id).toBe(createdWork.id);
    expect(work.title).toBe("Updated Title");
    expect(work.description).toBe("Updated Description");
  });

  it("should throw an error if work does not exist", async () => {
    await expect(
      sut.execute({
        workId: 999,
        data: { title: "Not Found" },
      })
    ).rejects.toThrow("Work not found.");
  });
});