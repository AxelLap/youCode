"use server";

import { prisma } from "@/lib/prisma";
import { authAction } from "@/lib/safe-action";
import { z } from "zod";

const courseOnUserActionCreateProps = z.object({
  courseId: z.string(),
});
// rejoindre un cours
export const courseOnUserActionCreate = authAction
  .inputSchema(courseOnUserActionCreateProps)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.userId) {
      throw new Error("User is not authenticated");
    }
    // vérifier que l'utilisateur n'a pas déjà rejoins le cours
    const userAlreadyJoined = await prisma.courseOnUser.findUnique({
      where: {
        userId_courseId: {
          userId: ctx.userId,
          courseId: parsedInput.courseId,
        },
      },
    });

    if (userAlreadyJoined) {
      return { message: "You have reached this course already" };
    }

    //création de la relation course / user
    await prisma.courseOnUser.create({
      data: {
        userId: ctx.userId,
        courseId: parsedInput.courseId,
        createdAt: new Date(),
      },
    });

    const lessonsToAddForUser = await prisma.course.findUnique({
      where: {
        id: parsedInput.courseId,
      },
      select: {
        lessons: true,
      },
    });

    if (lessonsToAddForUser?.lessons) {
      for (const lesson of lessonsToAddForUser.lessons) {
        await prisma.lessonOnUser.create({
          data: {
            userId: ctx.userId,
            lessonId: lesson.id,
            progress: "NOT_STARTED",
          },
        });
      }
    }

    return { message: "Successfully joined the course" };
  });
