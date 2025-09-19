import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { DeleteActivityService } from "./delete.service.js";

let mockActivityRepository;
let sut;

describe("Delete Activity Service", () => {
  beforeEach(() => {
    mockActivityRepository = {
      findById: vi.fn(),
      delete: vi.fn(),
    };
    sut = new DeleteActivityService(mockActivityRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should delete an existing activity", async () => {
    const activityId = 1;
    mockActivityRepository.delete.mockResolvedValue();

    await sut.execute(activityId);

    expect(mockActivityRepository.delete).toHaveBeenCalledWith(activityId);
  });

  it("should throw error if activity does not exist", async () => {
    const activityId = 999;
    mockActivityRepository.delete.mockRejectedValue(new Error("Activity not found."));

    await expect(sut.execute(activityId)).rejects.toThrow("Activity not found.");
  });
});