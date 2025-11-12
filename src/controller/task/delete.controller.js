import { PrismaTaskRepository } from "../../repositories/prisma/prisma-task-repository.js";
import { DeleteTaskService } from "../../services/task/delete.service.js";

export async function remove(req, res) {
  const { taskId } = req.params;

  try {
    const taskRepository = new PrismaTaskRepository();
    await new DeleteTaskService(taskRepository).execute(parseInt(taskId));

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
