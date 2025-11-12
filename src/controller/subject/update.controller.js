import { z } from "zod";
import { PrismaSubjectRepository } from "../../repositories/prisma/prisma-subject-repository.js";
import { UpdateSubjectService } from "../../services/subject/update.service.js";

const schema = z
  .object({
    name: z.string().max(255).optional(),
    code: z.string().max(100).optional(),
    professor: z.string().max(255).optional(),
    schedule: z.string().max(255).optional(),
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    message: "Body must have at least one field",
  });

export async function update(req, res) {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      errors: parsed.error.flatten().fieldErrors,
      message: "Invalid request body",
    });
  }

  const { subjectId } = req.params;

  try {
    const subjectRepository = new PrismaSubjectRepository();
    const service = new UpdateSubjectService(subjectRepository);
    const { subject } = await service.execute({
      subjectId: Number(subjectId),
      data: parsed.data,
    });

    return res.status(200).json(subject);
  } catch (err) {
    if (err?.code === "P2002") {
      return res.status(409).json({ error: "SUBJECT_CODE_ALREADY_EXISTS" });
    }
    if (err?.code === "P2025" || err?.message === "SUBJECT_NOT_FOUND") {
      return res.status(404).json({ error: "SUBJECT_NOT_FOUND" });
    }
    console.error("UPDATE SUBJECT ERROR:", err);
    return res.status(500).send();
  }
}
