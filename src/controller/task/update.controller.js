import { z } from "zod";
import { PrismaTaskRepository } from "../../repositories/prisma/prisma-task-repository.js";
import { UpdateTaskService } from "../../services/task/update.service.js";

export async function update(req, res) {
  const schema = z.object({
    title: z.string().max(255).optional(),
    description: z.string().optional(),
    status: z.enum(["pendente", "emprogresso", "completo"]).default("pendente"),
  });

  const parse = schema.safeParse(req.body);

  if (!parse.success) {
    const formattedError = parse.error.format();
    console.error(formattedError);
    return res.status(400).json({
      errors: formattedError,
      message: "Invalid request body",
    });
  }

  const { taskId } = req.params;

  try {
    const taskRepository = new PrismaTaskRepository();
    const { task } = await new UpdateTaskService(taskRepository).execute({
      taskId: parseInt(taskId),
      data: parse.data,
    });

    return res.status(200).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
