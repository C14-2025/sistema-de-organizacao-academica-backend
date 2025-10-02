import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { DeleteExamService } from "./delete.service.js";

let mockExamRepository;
let sut;

describe("Delete Exam Service", () => {
  beforeEach(() => {
    mockExamRepository = {
      findById: vi.fn(),
      delete: vi.fn(),
    };
    sut = new DeleteExamService(mockExamRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should delete an existing exam", async () => {
    const examId = 1;
    mockExamRepository.delete.mockResolvedValue();

    await sut.execute(examId);

    expect(mockExamRepository.delete).toHaveBeenCalledWith(examId);
  });

  it("should throw error if exam does not exist", async () => {
    const examId = 999;
    mockExamRepository.delete.mockRejectedValue(new Error("Exam not found."));

    await expect(sut.execute(examId)).rejects.toThrow("Exam not found.");
  });
});