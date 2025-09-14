import { z } from "zod";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository.js";
import { CreateUserService } from "../../services/user/create.service.js";

export async function create(req, res) {
  const schema = z.object({
    name: z.string().max(255),
    email: z.string(),
    secret: z.string().max(255),
    role: z.number().int(),
  });

  const parse = schema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({
      errors: parse.error.flatten().fieldErrors,
      message: "Invalid request body",
    });
  }

  const { name, email, secret, role } = parse.data;

  try {
    const userRepository = new PrismaUserRepository();
    const { user } = await new CreateUserService(userRepository).execute({
      name,
      email,
      secret,
      role,
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
