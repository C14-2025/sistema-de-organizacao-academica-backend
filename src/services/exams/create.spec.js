import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CreateExamService } from "./create.service.js";

let mockExamRepository;
let sut;

describe("Create Exam Service", () => {
  beforeEach(() => {
    mockExamRepository = {
      create: vi.fn(),
    };
    sut = new CreateExamService(mockExamRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create an exam", async () => {
    const examData = {
      title: "Exam 1",
      description: "Description 1",
      priority: "URGENT",
      status: "PENDING",
      userId: 1,
    };

    const createdExam = { id: 1, ...examData };

    mockExamRepository.create.mockResolvedValue(createdExam);

    const { exam } = await sut.execute(examData);

    expect(exam.id).toBe(1);
    expect(exam.title).toBe("Exam 1");
    expect(exam.priority).toBe("URGENT");
    expect(mockExamRepository.create).toHaveBeenCalledWith(examData);
  });
});