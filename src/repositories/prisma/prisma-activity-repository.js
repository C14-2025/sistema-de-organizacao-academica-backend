import { prisma } from "../../lib/prisma.js";

export class PrismaActivityRepository {
  async create(activity) {
    return await prisma.activity.create({ data: activity });
  }

  async update(activityId, activity) {
    return await prisma.activity.update({
      where: { id: activityId },
      data: activity,
    });
  }

  async delete(activityId) {
    await prisma.activity.delete({ where: { id: activityId } });
  }

  async findById(activityId) {
    return await prisma.activity.findUnique({ where: { id: activityId } });
  }

  async findByUserId(userId) {
    return await prisma.activity.findMany({ where: { userId } });
  }
}
