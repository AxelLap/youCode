"use server";
import { prisma } from "@/lib/prisma";
import { authAction } from "@/lib/safe-action";
import { z } from "zod";
import { LessonFormSchema } from "./lesson.schema";

const LessonActionUpdateProp = z.object({
  lessonId: z.string(),
  data: LessonFormSchema,
});

export const lessonActionUpdate = authAction
  .inputSchema(LessonActionUpdateProp)
  .action(async ({ parsedInput, ctx }) => {
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: parsedInput.lessonId,
      },
      include: {
        course: true,
      },
    });
    if (lesson?.course.creatorId === ctx.userId) {
      const updatedLesson = await prisma.lesson.update({
        where: {
          id: parsedInput.lessonId,
        },
        data: parsedInput.data,
      });
      return {
        message: "Lesson successfully updated !",
        lesson: updatedLesson,
        courseId: lesson?.course.id,
      };
    } else {
      throw new Error("You are not authorized to update this lesson");
    }
  });

const LessonActioncreateProp = z.object({
  data: LessonFormSchema,
  courseId: z.string(),
});

export const lessonActioncreate = authAction
  .inputSchema(LessonActioncreateProp)
  .action(async ({ parsedInput, ctx }) => {
    if (ctx.userId) {
      const createdLesson = await prisma.lesson.create({
        data: {
          name: parsedInput.data.name,
          state: parsedInput.data.state,
          content: parsedInput.data.content,
          rank: "aaaaa",
          courseId: parsedInput.courseId,
        },
      });
      return {
        message: "Lesson successfully created !",
        lesson: createdLesson,
        courseId: parsedInput.courseId,
      };
    } else {
      throw new Error("You must be logged to create lessons");
    }
  });
