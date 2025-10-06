import { z } from "zod";
import { PrismaExamRepository } from "../../repositories/prisma/prisma-exam-repository.js";
import { UpdateExamService } from "../../services/exams/update.service.js";

export async function update(req, res) {
  const schema = z.object({
    title: z.string().max(255).optional(),
    description: z.string().optional(),
    priority: z.enum(["URGENT", "IMPORTANT", "OPTIONAL"]).optional(),
    status: z.enum(["PENDING", "COMPLETED"]).optional(),
    deadline: z.string().datetime().optional(),
  });

  const parse = schema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({
      errors: parse.error.flatten().fieldErrors,
      message: "Invalid request body",
    });
  }

  const { examId } = req.params;

  try {
    const examRepository = new PrismaExamRepository();
    const { exam } = await new UpdateExamService(
      examRepository
    ).execute({
      examId: parseInt(examId),
      data: parse.data,
    });

    return res.status(200).json(exam);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}