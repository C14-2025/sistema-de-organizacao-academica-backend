import { expect, describe, it, beforeEach } from "vitest";
import { CreateActivityService } from "./create.service.js";
import { InMemoryActivityRepository } from "../../repositories/in-memory/in-memory-activity-repository.js";

let activityRepository;
let sut;

describe("Create Activity Service", () => {
  beforeEach(() => {
    activityRepository = new InMemoryActivityRepository();
    sut = new CreateActivityService(activityRepository);
  });

  it("should create an activity", async () => {
    const { activity } = await sut.execute({
      title: "Activity 1",
      description: "Description 1",
      priority: "URGENT",
      status: "PENDING",
      userId: 1,
    });

    expect(activity.id).toBe(1);
    expect(activity.title).toBe("Activity 1");
    expect(activity.priority).toBe("URGENT");
  });
});