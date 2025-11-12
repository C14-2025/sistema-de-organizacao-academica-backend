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
    const formattedError = parse.error.format();
    console.error(formattedError);
    return res.status(400).json({
      errors: formattedError,
      message: "Invalid request body",
    });
  }

  const { name, email, secret } = parse.data;

  try {
    const userRepository = new PrismaUserRepository();
    const { user } = await new CreateUserService(userRepository).execute({
      name,
      email,
      secret,
    });

    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
