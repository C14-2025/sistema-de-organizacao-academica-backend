import { PrismaWorkRepository } from "../../repositories/prisma/prisma-work-repository.js";
import { FindWorksByUserIdService } from "../../services/work/find-by-user-id.service.js";

export async function findByUserId(req, res) {
  const userId = req._private.jwt.userId;

  try {
    const workRepository = new PrismaWorkRepository();
    const { works } = await new FindWorksByUserIdService(
      workRepository
    ).execute(userId);

    return res.status(200).json(works);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}