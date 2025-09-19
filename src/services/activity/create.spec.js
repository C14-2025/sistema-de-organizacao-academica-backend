import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CreateActivityService } from "./create.service.js";

let mockActivityRepository;
let sut;

describe("Create Activity Service", () => {
  beforeEach(() => {
    mockActivityRepository = {
      create: vi.fn(),
    };
    sut = new CreateActivityService(mockActivityRepository);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should create an activity", async () => {
    const activityData = {
      title: "Activity 1",
      description: "Description 1",
      priority: "URGENT",
      status: "PENDING",
      userId: 1,
    };

    const createdActivity = { id: 1, ...activityData };

    mockActivityRepository.create.mockResolvedValue(createdActivity);

    const { activity } = await sut.execute(activityData);

    expect(activity.id).toBe(1);
    expect(activity.title).toBe("Activity 1");
    expect(activity.priority).toBe("URGENT");
    expect(mockActivityRepository.create).toHaveBeenCalledWith(activityData);
  });
});