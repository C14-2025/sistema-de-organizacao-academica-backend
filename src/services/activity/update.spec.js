import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { UpdateActivityService } from "./update.service.js";

let mockActivityRepository;
let sut;

describe("Update Activity Service", () => {
  beforeEach(() => {
    mockActivityRepository = {
      findById: vi.fn(),
      update: vi.fn(),
    };
    sut = new UpdateActivityService(mockActivityRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should update an existing activity", async () => {
    const existingActivity = {
      id: 1,
      title: "Activity 1",
      description: "Description 1",
      userId: 1,
      status: "PENDING",
    };

    const updatedActivityData = {
      title: "Activity Updated",
      status: "COMPLETED",
    };

    const updatedActivity = { ...existingActivity, ...updatedActivityData };

    mockActivityRepository.update.mockResolvedValue(updatedActivity);

    const response = await sut.execute({
      activityId: existingActivity.id,
      data: updatedActivityData,
    });

    expect(response.activity.id).toBe(existingActivity.id);
    expect(response.activity.title).toBe("Activity Updated");
    expect(response.activity.status).toBe("COMPLETED");
    expect(mockActivityRepository.update).toHaveBeenCalledWith(existingActivity.id, updatedActivityData);
  });

  it("should throw error if activity does not exist", async () => {
    mockActivityRepository.update.mockRejectedValue(new Error("Activity not found."));

    await expect(
      sut.execute({
        activityId: 999,
        data: { title: "Not Found" },
      })
    ).rejects.toThrow("Activity not found.");
  });
});