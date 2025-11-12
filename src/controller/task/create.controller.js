import { z } from "zod";
import { PrismaTaskRepository } from "../../repositories/prisma/prisma-task-repository.js";
import { CreateTaskService } from "../../services/task/create.service.js";

export async function create(req, res) {
  const schema = z.object({
    title: z.string().max(255),
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
  const { title, description, priority, status, deadline } = parse.data;
  const userId = req._private.jwt.userId;
  try {
    const taskRepository = new PrismaTaskRepository();
    const { task } = await new CreateTaskService(
      taskRepository,
    ).execute({
      title,
      description,
      priority,
      status,
      deadline,
      userId,
    });
    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
