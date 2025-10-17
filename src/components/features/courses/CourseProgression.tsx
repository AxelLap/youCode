import { calculateProgression } from "@/lib/calculateProgression";
import { prisma } from "@/lib/prisma";
import { Crown } from "lucide-react";

type CourseProgressionProps = {
  courseId: string;
  userId: string;
};

export const CourseProgression = async ({
  courseId,
  userId,
}: CourseProgressionProps) => {
  const lessons = await prisma.lesson.findMany({
    where: {
      courseId: courseId,
    },
    select: {
      users: {
        where: {
          userId: userId,
        },
      },
    },
  });

  const totalLessons = lessons.length;

  const completedLessons = lessons.filter(
    (lesson) => lesson.users[0].progress === "COMPLETED"
  ).length;

  const progresPourcent = calculateProgression({
    completedLessons,
    totalLessons,
  });
  return (
    <div className="w-13 h-12 rounded-md border mt-auto flex justify-center items-center">
      {progresPourcent === 100 ? (
        <Crown />
      ) : (
        <span>{`${progresPourcent} %`}</span>
      )}
    </div>
  );
};
