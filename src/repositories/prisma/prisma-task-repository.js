import { prisma } from "../../lib/prisma.js";

export class PrismaTaskRepository {
  async create(task) {
    return await prisma.task.create({ data: task });
  }

  async update(taskId, task) {
    return await prisma.task.update({
      where: { id: taskId },
      data: task,
    });
  }

  async delete(taskId) {
    await prisma.task.delete({ where: { id: taskId } });
  }

  async findById(taskId) {
    return await prisma.task.findUnique({ where: { id: taskId } });
  }

  async findByUserId(userId) {
    return await prisma.task.findMany({ where: { userId } });
  }
}
