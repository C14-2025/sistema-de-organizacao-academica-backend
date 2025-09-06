import { prisma } from "../../lib/prisma.js";

export class PrismaSubjectRepository {
  async create(data) {
    const subject = await prisma.subject.create({ data });
    return { subject };
  }

  async update(subjectId, data) {
    const subject = await prisma.subject.update({
      where: { id: subjectId },
      data,
    });
    return { subject };
  }

  async findById(subjectId) {
    const subject = await prisma.subject.findUnique({
      where: { id: subjectId },
    });
    return { subject };
  }

  async findByUserId(userId) {
    const subjects = await prisma.subject.findMany({
      where: { userId },
      orderBy: { id: "desc" },
    });
    return { subjects };
  }

  async findFirst(where) {
    const subject = await prisma.subject.findFirst({ where });
    return { subject };
  }

  async delete(subjectId) {
    await prisma.subject.delete({ where: { id: subjectId } });
  }
}
