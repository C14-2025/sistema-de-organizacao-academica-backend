import { PrismaUserRepository } from "../../repositories/prisma/prisma-user-repository.js";
import { FindByIdService } from "../../../src/services/find-by-id.service.js";

export async function findById(req, res) {
  const userId = req._private.jwt.userId;

  try {
    const userRepository = new PrismaUserRepository();
    const { user } = await new FindByIdService(userRepository).execute(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
