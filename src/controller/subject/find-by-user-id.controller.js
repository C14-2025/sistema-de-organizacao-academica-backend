import { PrismaSubjectRepository } from "../../repositories/prisma/prisma-subject-repository.js";
import { FindSubjectsByUserIdService } from "../../services/subject/find-by-user-id.service.js";

export async function findByUserId(req, res) {
  const userId = req._private.jwt.userId;

  try {
    const subjectRepository = new PrismaSubjectRepository();
    const { subjects } = await new FindSubjectsByUserIdService(
      subjectRepository,
    ).execute(userId);

    return res.status(200).json(subjects);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
