import { z } from "zod";
import { PrismaExamRepository } from "../../repositories/prisma/prisma-exam-repository.js";
import { CreateExamService } from "../../services/exams/create.service.js";

export async function create(req, res) {
  const schema = z.object({
    title: z.string().max(255),
    date: z.coerce.date(),
    location: z.string().max(255),
    expectedNote: z.number().optional(),
    subjectId: z.number().int(),
  });

  const parse = schema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({
      errors: parse.error.formErrors().fieldErrors,
      message: "Invalid request body",
    });
  }

  const { title, date, location, expectedNote, subjectId } = parse.data;
  const userId = req._private.jwt.userId;

  try {
    const examRepository = new PrismaExamRepository();
    const { exam } = await new CreateExamService(examRepository).execute({
      title,
      date,
      location,
      expectedNote,
      subjectId,
      userId,
    });

    return res.status(201).json(exam);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
