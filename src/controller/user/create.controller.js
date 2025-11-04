import { z } from "zod";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository.js";
import { CreateUserService } from "../../services/user/create.service.js";

export async function create(req, res) {
  const schema = z.object({
    email: z.email(),
    secret: z.string().max(255),
  });

  const parse = schema.safeParse(req.body);

  if (!parse.success) {
    const error = {
      errors: parse.error.flatten().fieldErrors,
      message: "Invalid request body",
    };
    console.error(error);
    return res.status(400).json(error);
  }

  const { email, secret } = parse.data;

  try {
    const userRepository = new PrismaUserRepository();
    const { user } = await new CreateUserService(userRepository).execute({
      email,
      secret,
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
