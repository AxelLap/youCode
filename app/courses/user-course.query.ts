import { prisma } from "@/lib/prisma";

export async function isCourseMember({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) {
  const isMember = await prisma.courseOnUser.findUnique({
    where: {
      userId_courseId: {
        courseId: courseId,
        userId: userId,
      },
    },
  });

  if (isMember) {
    return true;
  } else {
    return false;
  }
}
