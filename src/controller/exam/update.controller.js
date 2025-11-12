import { z } from "zod";
import { PrismaExamRepository } from "../../repositories/prisma/prisma-exam-repository.js";
import { UpdateExamService } from "../../services/exams/update.service.js";

export async function update(req, res) {
  const schema = z.object({
    title: z.string().max(255).optional(),
    date: z.coerce.date().optional(),
    location: z.string().max(255).optional(),
    expectedNote: z.number().optional(),
    subjectId: z.number().int().optional(),
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

  const { examId } = req.params;

  try {
    const examRepository = new PrismaExamRepository();
    const { exam } = await new UpdateExamService(examRepository).execute({
      examId: parseInt(examId),
      data: parse.data,
    });

    return res.status(200).json(exam);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
