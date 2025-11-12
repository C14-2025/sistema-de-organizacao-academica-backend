import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { DeleteTaskService } from "./delete.service.js";

let mockTaskRepository;
let sut;

describe("Delete Task Service", () => {
  beforeEach(() => {
    mockTaskRepository = {
      findById: vi.fn(),
      delete: vi.fn(),
    };
    sut = new DeleteTaskService(mockTaskRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should delete an existing task", async () => {
    const taskId = 1;
    mockTaskRepository.delete.mockResolvedValue();

    await sut.execute(taskId);

    expect(mockTaskRepository.delete).toHaveBeenCalledWith(taskId);
  });

  it("should throw error if task does not exist", async () => {
    const taskId = 999;
    mockTaskRepository.delete.mockRejectedValue(
      new Error("Task not found."),
    );

    await expect(sut.execute(taskId)).rejects.toThrow(
      "Task not found.",
    );
  });
});
