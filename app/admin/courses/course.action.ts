"use server";
import { generateCourseId } from "@/lib/generate-id";
import { prisma } from "@/lib/prisma";
import { authAction } from "@/lib/safe-action";
import { z } from "zod";
import { CourseFormSchema } from "./course.schema";

// actions
const CourseActionUpdateProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

export const courseActionUpdate = authAction
  .inputSchema(CourseActionUpdateProps)
  .action(async ({ parsedInput, ctx }) => {
    await prisma.course.update({
      where: {
        id: parsedInput.courseId,
        creatorId: ctx.userId,
      },
      data: parsedInput.data,
    });
    return "Successfully updated";
  });

const CourseActionCreateProps = z.object({
  data: CourseFormSchema,
});

export const courseActionCreate = authAction
  .inputSchema(CourseActionCreateProps)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.userId) {
      throw new Error("User is not authenticated");
    }
    const course = await prisma.course.create({
      data: {
        id: generateCourseId(),
        name: parsedInput.data.name,
        presentation: parsedInput.data.presentation,
        image: parsedInput.data.image,
        createdAt: new Date(),
        creatorId: ctx.userId,
        state: "DRAFT",
      },
      include: {
        creator: true,
        lessons: true,
        users: true,
      },
    });
    return { message: "Successfully updated", course: course };
  });
