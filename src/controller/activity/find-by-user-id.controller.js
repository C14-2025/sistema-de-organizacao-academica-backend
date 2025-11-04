import { PrismaActivityRepository } from "../../repositories/prisma/prisma-activity-repository.js";
import { FindByUserIdService } from "../../services/activity/find-by-user-id.service.js";

export async function findByUserId(req, res) {
  const userId = req._private.jwt.userId;

  try {
    const activityRepository = new PrismaActivityRepository();
    const { activities } = await new FindByUserIdService(
      activityRepository,
    ).execute(userId);

    return res.status(200).json(activities);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
