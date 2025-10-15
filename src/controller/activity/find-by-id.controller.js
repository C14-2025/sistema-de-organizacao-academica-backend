import { PrismaActivityRepository } from "../../repositories/prisma/prisma-activity-repository.js";
import { FindByIdService } from "../../services/activity/find-by-id.service.js";

export async function findById(req, res) {
  const { activityId } = req.params;

  try {
    const activityRepository = new PrismaActivityRepository();
    const { activity } = await new FindByIdService(activityRepository).execute(
      parseInt(activityId),
    );

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    return res.status(200).json(activity);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
