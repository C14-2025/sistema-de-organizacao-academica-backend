import { PrismaWorkRepository } from "../../repositories/prisma/prisma-work-repository.js";
import { FindWorkByIdService } from "../../services/work/find-by-id.service.js";

export async function findById(req, res) {
  const { workId } = req.params;

  try {
    const workRepository = new PrismaWorkRepository();
    const { work } = await new FindWorkByIdService(workRepository).execute(
      parseInt(workId),
    );

    if (!work) {
      return res.status(404).json({ message: "Work not found" });
    }

    return res.status(200).json(work);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
