import { PrismaExamRepository } from "../../repositories/prisma/prisma-exam-repository.js";
import { DeleteExamService } from "../../services/exams/delete.service.js";

export async function remove(req, res) {
  const { examId } = req.params;

  try {
    const examRepository = new PrismaExamRepository();
    await new DeleteExamService(examRepository).execute(parseInt(examId));

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
