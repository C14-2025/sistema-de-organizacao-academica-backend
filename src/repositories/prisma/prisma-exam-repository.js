import { prisma } from "../../lib/prisma.js";

export class PrismaExamRepository {
  async create(exam) {
    return await prisma.exam.create({ data: exam });
  }

  async update(examId, exam) {
    return await prisma.exam.update({
      where: { id: examId },
      data: exam,
    });
  }

  async delete(examId) {
    await prisma.exam.delete({ where: { id: examId } });
  }

  async findById(examId) {
    return await prisma.exam.findUnique({ where: { id: examId } });
  }

  async findByUserId(userId) {
    return await prisma.exam.findMany({ where: { userId } });
  }
}
