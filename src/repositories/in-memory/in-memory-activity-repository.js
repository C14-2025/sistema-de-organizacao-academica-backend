export class InMemoryActivityRepository {
  activities = [];

  async create(activity) {
    const newActivity = {
      id: this.activities.length + 1,
      ...activity,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.activities.push(newActivity);

    return newActivity;
  }

  async update(activityId, activity) {
    const existingActivity = this.activities.find((a) => a.id === activityId);

    if (!existingActivity) {
      throw new Error("Activity not found.");
    }

    const updatedActivity = {
      ...existingActivity,
      ...activity,
      updatedAt: new Date(),
    };

    this.activities = this.activities.map((a) =>
      a.id === activityId ? updatedActivity : a
    );

    return updatedActivity;
  }

  async delete(activityId) {
    const index = this.activities.findIndex((a) => a.id === activityId);
    if (index === -1) {
      throw new Error("Activity not found.");
    }
    this.activities.splice(index, 1);
  }

  async findById(activityId) {
    const activity = this.activities.find((a) => a.id === activityId);
    return activity || null;
  }

  async findByUserId(userId) {
    return this.activities.filter((a) => a.userId === userId);
  }
}