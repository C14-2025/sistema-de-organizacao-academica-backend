import { PrismaTaskRepository } from "../../repositories/prisma/prisma-task-repository.js";
import { FindByUserIdService } from "../../services/task/find-by-user-id.service.js";

export async function findByUserId(req, res) {
  const userId = req._private.jwt.userId;

  try {
    const taskRepository = new PrismaTaskRepository();
    const { activities } = await new FindByUserIdService(
      taskRepository,
    ).execute(userId);

    return res.status(200).json(activities);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
