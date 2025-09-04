import { expect, describe, it, beforeEach } from "vitest";
import { DeleteActivityService } from "./delete.service.js";
import { InMemoryActivityRepository } from "../../repositories/in-memory/in-memory-activity-repository.js";
import { CreateActivityService } from "./create.service.js";

let activityRepository;
let sut;
let createActivityService;

describe("Delete Activity Service", () => {
  beforeEach(() => {
    activityRepository = new InMemoryActivityRepository();
    sut = new DeleteActivityService(activityRepository);
    createActivityService = new CreateActivityService(activityRepository);
  });

  it("should delete an existing activity", async () => {
    const { activity } = await createActivityService.execute({
      title: "Activity 1",
      userId: 1,
    });

    await sut.execute(activity.id);

    const deletedActivity = await activityRepository.findById(activity.id);
    expect(deletedActivity).toBeNull();
  });

  it("should throw error if activity does not exist", async () => {
    await expect(sut.execute(999)).rejects.toThrow("Activity not found.");
  });
});