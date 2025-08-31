import { prisma } from "../../lib/prisma.js";

export class PrismaUserRepository {
  async create(user) {
    return await prisma.user.create({ data: user });
  }

  async update(userId, user) {
    return await prisma.user.update({
      where: { id: userId },
      data: user,
    });
  }

  async delete(userId) {
    await prisma.user.delete({ where: { id: userId } });
  }

  async findByEmail(email) {
    return await prisma.user.findFirst({ where: { email } });
  }

  async findById(userId) {
    return await prisma.user.findUnique({ where: { id: userId } });
  }

  async findByName(name) {
    return await prisma.user.findFirst({ where: { name } });
  }
}
