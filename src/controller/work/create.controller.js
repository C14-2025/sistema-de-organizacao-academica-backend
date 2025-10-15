import { z } from "zod";
import { PrismaWorkRepository } from "../../repositories/prisma/prisma-work-repository.js";
import { CreateWorkService } from "../../services/work/create.service.js";

export async function create(req, res) {
  const schema = z.object({
    title: z.string().max(255),
    description: z.string().optional(),
    deadline: z.string().datetime(),
    requirements: z.string().optional(),
    subjectId: z.number().int(),
  });

  const parse = schema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({
      errors: parse.error.flatten().fieldErrors,
      message: "Invalid request body",
    });
  }

  const { title, description, deadline, requirements, subjectId } = parse.data;
  const userId = req._private.jwt.userId;

  try {
    const workRepository = new PrismaWorkRepository();
    const { work } = await new CreateWorkService(workRepository).execute({
      title,
      description,
      deadline,
      requirements,
      subjectId,
      userId,
    });

    return res.status(201).json(work);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
