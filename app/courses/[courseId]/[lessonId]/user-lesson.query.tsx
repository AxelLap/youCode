import { prisma } from "@/lib/prisma";
import { Progress } from "@prisma/client";

type GetLessonOnUserProgressProps = {
  userId: string;
  lessonId: string;
};
export async function getLessonOnUserProgress({
  userId,
  lessonId,
}: GetLessonOnUserProgressProps) {
  const progress = await prisma.lessonOnUser.findUnique({
    where: {
      userId_lessonId: {
        userId: userId,
        lessonId: lessonId,
      },
    },
    select: {
      lessonId: true,
      progress: true,
    },
  });
  return progress;
}

type updateLessonProgressProps = {
  userId: string;
  lessonId: string;
  progress: Progress;
};

export async function updateLessonProgress({
  userId,
  lessonId,
  progress,
}: updateLessonProgressProps) {
  const updatedProgression = await prisma.lessonOnUser.update({
    where: {
      userId_lessonId: {
        userId: userId,
        lessonId: lessonId,
      },
    },
    data: {
      progress: progress,
    },
  });

  if (!updatedProgression) {
    throw new Error("Error while lesson on user updating");
  }

  return updatedProgression;
}
