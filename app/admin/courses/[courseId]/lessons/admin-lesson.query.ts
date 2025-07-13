import { generateLessonId } from "@/lib/generate-id";
import { prisma } from "@/lib/prisma";

export async function addLesson(
  courseId: string,
  data: {
    name: string;
    state: "HIDDEN" | "PUBLIC" | "PUBLISHED";
    content: string;
  }
) {
  console.log("add lesson is called");

  const newLesson = await prisma.lesson.create({
    data: {
      id: generateLessonId(),
      name: data.name,
      rank: "aaaaaa",
      content: data.content,
      state: data.state,
      createdAt: new Date(),
      courseId: courseId,
    },
  });
  return newLesson;
}
