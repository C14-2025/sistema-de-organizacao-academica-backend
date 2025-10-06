import { PrismaExamRepository } from "../../repositories/prisma/prisma-exam-repository.js";
import { FindByIdService } from "../../services/exams/find-by-id.service.js";

export async function findById(req, res) {
  const { examId } = req.params;

  try {
    const examRepository = new PrismaExamRepository();
    const { exam } = await new FindByIdService(examRepository).execute(
      parseInt(examId)
    );

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    return res.status(200).json(exam);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}