import { prisma } from "../../lib/prisma.js";

export class PrismaWorkRepository {
  async create(work) {
    return await prisma.work.create({ data: work });
  }

  async update(workId, work) {
    return await prisma.work.update({
      where: { id: workId },
      data: work,
    });
  }

  async delete(workId) {
    await prisma.work.delete({ where: { id: workId } });
  }

  async findById(workId) {
    return await prisma.work.findUnique({ where: { id: workId } });
  }

  async findByUserId(userId) {
    return await prisma.work.findMany({ where: { userId } });
  }
}