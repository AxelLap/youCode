"use server";
import { prisma } from "@/lib/prisma";

export async function switchCourseState(courseId: string) {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  const update = await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      state: course?.state === "DRAFT" ? "PUBLISHED" : "DRAFT",
    },
  });

  if (!update) {
    throw new Error("Error while updating state");
  } else {
    return update.state;
  }
}
