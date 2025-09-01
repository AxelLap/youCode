import { prisma } from "@/lib/prisma";

export async function getLesson({
  lessonId,
  userId,
}: {
  lessonId: string;
  userId: string;
}) {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    include: {
      course: true,
    },
  });

  if (lesson?.course.creatorId !== userId) {
    throw new Error("You are not able to see this lesson");
  }

  return lesson;
}
