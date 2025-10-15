import { PrismaSubjectRepository } from "../../repositories/prisma/prisma-subject-repository.js";
import { FindSubjectByIdService } from "../../services/subject/find-by-id.service.js";

export async function findById(req, res) {
  const { subjectId } = req.params;

  try {
    const subjectRepository = new PrismaSubjectRepository();
    const { subject } = await new FindSubjectByIdService(
      subjectRepository,
    ).execute(parseInt(subjectId));

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    return res.status(200).json(subject);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
