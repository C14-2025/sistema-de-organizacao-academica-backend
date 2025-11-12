import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CreateTaskService } from "./create.service.js";

let mockTaskRepository;
let sut;

describe("Create Task Service", () => {
  beforeEach(() => {
    mockTaskRepository = {
      create: vi.fn(),
    };
    sut = new CreateTaskService(mockTaskRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create an task", async () => {
    const taskData = {
      title: "Task 1",
      description: "Description 1",
      priority: "URGENT",
      status: "PENDING",
      userId: 1,
    };

    const createdTask = { id: 1, ...taskData };

    mockTaskRepository.create.mockResolvedValue(createdTask);

    const { task } = await sut.execute(taskData);

    expect(task.id).toBe(1);
    expect(task.title).toBe("Task 1");
    expect(task.priority).toBe("URGENT");
    expect(mockTaskRepository.create).toHaveBeenCalledWith(taskData);
  });
});
