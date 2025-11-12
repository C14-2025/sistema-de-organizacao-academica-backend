import { z } from "zod";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository.js";
import { AuthenticateService } from "../../services/user/authenticate.service.js";

export async function authenticate(req, res) {
  const authenticateUserBodySchema = z.object({
    email: z.email(),
    secret: z.string().max(255),
  });

  const parse = authenticateUserBodySchema.safeParse(req.body);

  if (!parse.success) {
    const formattedError = parse.error.format();
    console.error(formattedError);
    return res.status(400).json({
      errors: formattedError,
      message: "Invalid request body",
    });
  }

  const { email, secret } = parse.data;

  try {
    const userRepository = new PrismaUserRepository();
    const { user, jwt } = await new AuthenticateService(userRepository).execute(
      {
        email,
        secret,
      },
    );

    res.status(200).send({
      user,
      jwt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
}
