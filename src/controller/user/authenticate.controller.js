import { z } from "zod";
import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository.js";
import { AuthenticateService } from "../../services/user/authenticate.service.js";

export async function authenticate(req, res) {
  const AuthenticateUserBodySchema = z.object({
    email: z.email(),
    secret: z.string().max(255),
  });

  const parse = AuthenticateUserBodySchema.safeParse(req.body);

  if (parse.error) {
    const error = {
      errors: parse.error.flatten().fieldErrors,
      message: "Invalid request body",
    };
    console.error(error);
    return res.status(400).send(error);
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
