"use server";

import { prisma } from "@/lib/prisma";
import { authAction } from "@/lib/safe-action";
import { z } from "zod";

const updateLessonProgressProps = z.object({
  lessonId: z.string(),
  progress: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
});

export const updateLessonProgress = authAction
  .inputSchema(updateLessonProgressProps)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.userId) {
      throw new Error();
    }

    const updatedProgression = await prisma.lessonOnUser.update({
      where: {
        userId_lessonId: {
          userId: ctx.userId,
          lessonId: parsedInput.lessonId,
        },
      },
      data: {
        progress: parsedInput.progress,
      },
    });

    if (!updatedProgression) {
      throw new Error("Error while lesson on user updating");
    }

    return updatedProgression;
  });
