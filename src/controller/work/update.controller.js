import { z } from "zod";
import { PrismaWorkRepository } from "../../repositories/prisma/prisma-work-repository.js";
import { UpdateWorkService } from "../../services/work/update.service.js";

export async function update(req, res) {
  const schema = z.object({
    title: z.string().max(255).optional(),
    description: z.string().optional(),
    deadline: z.string().datetime().optional(),
    requirements: z.string().optional(),
    subjectId: z.number().int().optional(),
  });

  const parse = schema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({
      errors: parse.error.flatten().fieldErrors,
      message: "Invalid request body",
    });
  }

  const { workId } = req.params;

  try {
    const workRepository = new PrismaWorkRepository();
    const { work } = await new UpdateWorkService(workRepository).execute({
      workId: parseInt(workId),
      data: parse.data,
    });

    return res.status(200).json(work);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}