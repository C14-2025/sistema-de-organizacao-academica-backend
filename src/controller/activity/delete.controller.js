import { PrismaActivityRepository } from "../../repositories/prisma/prisma-activity-repository.js";
import { DeleteActivityService } from "../../services/activity/delete.service.js";

export async function remove(req, res) {
  const { activityId } = req.params;

  try {
    const activityRepository = new PrismaActivityRepository();
    await new DeleteActivityService(activityRepository).execute(
      parseInt(activityId)
    );

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}