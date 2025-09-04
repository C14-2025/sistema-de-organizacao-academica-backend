import { expect, describe, it, beforeEach } from "vitest";
import { UpdateActivityService } from "./update.service.js";
import { InMemoryActivityRepository } from "../../repositories/in-memory/in-memory-activity-repository.js";
import { CreateActivityService } from "./create.service.js";

let activityRepository;
let sut;
let createActivityService;

describe("Update Activity Service", () => {
  beforeEach(() => {
    activityRepository = new InMemoryActivityRepository();
    sut = new UpdateActivityService(activityRepository);
    createActivityService = new CreateActivityService(activityRepository);
  });

  it("should update an existing activity", async () => {
    const { activity } = await createActivityService.execute({
      title: "Activity 1",
      description: "Description 1",
      userId: 1,
    });

    const response = await sut.execute({
      activityId: activity.id,
      data: {
        title: "Activity Updated",
        status: "COMPLETED",
      },
    });

    expect(response.activity.id).toBe(activity.id);
    expect(response.activity.title).toBe("Activity Updated");
    expect(response.activity.status).toBe("COMPLETED");
  });

  it("should throw error if activity does not exist", async () => {
    await expect(
      sut.execute({
        activityId: 999,
        data: { title: "Not Found" },
      })
    ).rejects.toThrow("Activity not found.");
  });
});