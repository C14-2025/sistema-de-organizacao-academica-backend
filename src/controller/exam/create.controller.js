import { z } from "zod";
import { PrismaExamRepository } from "../../repositories/prisma/prisma-exam-repository.js";
import { CreateExamService } from "../../services/exam/create.service.js";

export async function create(req, res) {
  const schema = z.object({
    title: z.string().max(255),
    description: z.string().optional(),
    priority: z.enum(["URGENT", "IMPORTANT", "OPTIONAL"]).default("OPTIONAL"),
    status: z.enum(["PENDING", "COMPLETED"]).default("PENDING"),
    deadline: z.string().datetime().optional(),
  });

  const parse = schema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({
      errors: parse.error.flatten().fieldErrors,
      message: "Invalid request body",
    });
  }

  const { title, description, priority, status, deadline } = parse.data;
  const userId = req._private.jwt.userId;

  try {
    const examRepository = new PrismaExamRepository();
    const { exam } = await new CreateExamService(
      examRepository
    ).execute({
      title,
      description,
      priority,
      status,
      deadline,
      userId,
    });

    return res.status(201).json(exam);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}