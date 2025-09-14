import { z } from "zod";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository.js";
import { UpdateUserService } from "../../services/user/update.service.js";

export async function update(req, res) {
  const schema = z.object({
    name: z.string().max(255).optional(),
    email: z.string().optional(),
    secret: z.string().max(255).optional(),
    role: z.number().int().optional(),
  });

  const parse = schema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({
      errors: parse.error.flatten().fieldErrors,
      message: "Invalid request body",
    });
  }

  const { userId } = req.params;

  try {
    const userRepository = new PrismaUserRepository();
    const { user } = await new UpdateUserService(userRepository).execute({
      userId: parseInt(userId),
      data: parse.data,
    });

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
