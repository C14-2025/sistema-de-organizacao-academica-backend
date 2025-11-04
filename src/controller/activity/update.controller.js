import { z } from "zod";
import { PrismaActivityRepository } from "../../repositories/prisma/prisma-activity-repository.js";
import { UpdateActivityService } from "../../services/activity/update.service.js";

export async function update(req, res) {
  const schema = z.object({
    title: z.string().max(255).optional(),
    description: z.string().optional(),
    priority: z.enum(["URGENT", "IMPORTANT", "OPTIONAL"]).optional(),
    status: z.enum(["PENDING", "COMPLETED"]).optional(),
    deadline: z.string().datetime().optional(),
  });

  const parse = schema.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({
      errors: parse.error.flatten().fieldErrors,
      message: "Invalid request body",
    });
  }

  const { activityId } = req.params;

  try {
    const activityRepository = new PrismaActivityRepository();
    const { activity } = await new UpdateActivityService(
      activityRepository,
    ).execute({
      activityId: parseInt(activityId),
      data: parse.data,
    });

    return res.status(200).json(activity);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
}
