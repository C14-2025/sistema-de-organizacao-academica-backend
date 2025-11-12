import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { UpdateTaskService } from "./update.service.js";

let mockTaskRepository;
let sut;

describe("Update Task Service", () => {
  beforeEach(() => {
    mockTaskRepository = {
      findById: vi.fn(),
      update: vi.fn(),
    };
    sut = new UpdateTaskService(mockTaskRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should update an existing task", async () => {
    const existingTask = {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      userId: 1,
      status: "PENDING",
    };

    const updatedTaskData = {
      title: "Task Updated",
      status: "COMPLETED",
    };

    const updatedTask = { ...existingTask, ...updatedTaskData };

    mockTaskRepository.update.mockResolvedValue(updatedTask);

    const response = await sut.execute({
      taskId: existingTask.id,
      data: updatedTaskData,
    });

    expect(response.task.id).toBe(existingTask.id);
    expect(response.task.title).toBe("Task Updated");
    expect(response.task.status).toBe("COMPLETED");
    expect(mockTaskRepository.update).toHaveBeenCalledWith(
      existingTask.id,
      updatedTaskData,
    );
  });

  it("should throw error if task does not exist", async () => {
    mockTaskRepository.update.mockRejectedValue(new Error("Task not found."));

    await expect(
      sut.execute({
        taskId: 999,
        data: { title: "Not Found" },
      }),
    ).rejects.toThrow("Task not found.");
  });
});
