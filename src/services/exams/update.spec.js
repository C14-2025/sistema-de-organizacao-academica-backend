import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { UpdateExamService } from "./update.service.js";

let mockExamRepository;
let sut;

describe("Update Exam Service", () => {
  beforeEach(() => {
    mockExamRepository = {
      findById: vi.fn(),
      update: vi.fn(),
    };
    sut = new UpdateExamService(mockExamRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should update an existing exam", async () => {
    const existingExam = {
      id: 1,
      title: "Exam 1",
      description: "Description 1",
      userId: 1,
      status: "PENDING",
    };

    const updatedExamData = {
      title: "Exam Updated",
      status: "COMPLETED",
    };

    const updatedExam = { ...existingExam, ...updatedExamData };

    mockExamRepository.update.mockResolvedValue(updatedExam);

    const response = await sut.execute({
      examId: existingExam.id,
      data: updatedExamData,
    });

    expect(response.exam.id).toBe(existingExam.id);
    expect(response.exam.title).toBe("Exam Updated");
    expect(response.exam.status).toBe("COMPLETED");
    expect(mockExamRepository.update).toHaveBeenCalledWith(existingExam.id, updatedExamData);
  });

  it("should throw error if exam does not exist", async () => {
    mockExamRepository.update.mockRejectedValue(new Error("Exam not found."));

    await expect(
      sut.execute({
        examId: 999,
        data: { title: "Not Found" },
      })
    ).rejects.toThrow("Exam not found.");
  });
});