import { PrismaWorkRepository } from "../../repositories/prisma/prisma-work-repository.js";
import { DeleteWorkService } from "../../services/work/delete.service.js";

export async function remove(req, res) {
  const { workId } = req.params;

  try {
    const workRepository = new PrismaWorkRepository();
    await new DeleteWorkService(workRepository).execute(parseInt(workId));

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}