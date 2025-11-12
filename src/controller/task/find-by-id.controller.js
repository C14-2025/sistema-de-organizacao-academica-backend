import { PrismaTaskRepository } from "../../repositories/prisma/prisma-task-repository.js";
import { FindByIdService } from "../../services/task/find-by-id.service.js";

export async function findById(req, res) {
  const { taskId } = req.params;

  try {
    const taskRepository = new PrismaTaskRepository();
    const { task } = await new FindByIdService(taskRepository).execute(
      parseInt(taskId),
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
