import { prisma } from "@/lib/prisma";

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
