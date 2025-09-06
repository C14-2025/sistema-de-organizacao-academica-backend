import { PrismaSubjectRepository } from "../../repositories/prisma/prisma-subject-repository.js";
import { DeleteSubjectService } from "../../services/subject/delete.service.js";

export async function remove(req, res) {
  const { subjectId } = req.params;

  try {
    const subjectRepository = new PrismaSubjectRepository();
    await new DeleteSubjectService(subjectRepository).execute(parseInt(subjectId));

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
