import { z } from "zod";
import { PrismaSubjectRepository } from "../../repositories/prisma/prisma-subject-repository.js";
import { CreateSubjectService } from "../../services/subject/create.service.js";

export async function create(req, res) {
  const schema = z.object({
    name: z.string().max(255),
    code: z.string().max(100),
    professor: z.string().max(255),
    schedule: z.string().max(255).optional(),
  });

  const parse = schema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({
      errors: parse.error.flatten().fieldErrors,
      message: "Invalid request body",
    });
  }

  const userId = req._private.jwt.userId;
  const { name, code, professor, schedule } = parse.data;

  try {
    const subjectRepository = new PrismaSubjectRepository();
    const { subject } = await new CreateSubjectService(
      subjectRepository,
    ).execute({
      name,
      code,
      professor,
      schedule,
      userId,
    });

    return res.status(201).json(subject);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
