import { z } from "zod";
import { PrismaSubjectRepository } from "../../repositories/prisma/prisma-subject-repository.js";
import { UpdateSubjectService } from "../../services/subject/update.service.js";

export async function update(req, res) {
  const schema = z.object({
    name: z.string().max(255).optional(),
    code: z.string().max(100).optional(),
    professor: z.string().max(255).optional(),
    schedule: z.string().max(255).optional(),
  });

  const parse = schema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({
      errors: parse.error.flatten().fieldErrors,
      message: "Invalid request body",
    });
  }

  const { subjectId } = req.params;

  try {
    const subjectRepository = new PrismaSubjectRepository();
    const { subject } = await new UpdateSubjectService(
      subjectRepository,
    ).execute({
      subjectId: parseInt(subjectId),
      data: parse.data,
    });

    return res.status(200).json(subject);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
