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

const RemoveUserProps = z.object({
  courseId: z.string(),
  userId: z.string(),
});

export const removeUser = authAction
  .inputSchema(RemoveUserProps)
  .action(async ({ parsedInput, ctx }) => {
    const courseOnUser = await prisma.courseOnUser.findUnique({
      where: {
        userId_courseId: {
          userId: parsedInput.userId,
          courseId: parsedInput.courseId,
        },
      },
      include: {
        user: true,
        course: true,
      },
    });
    if (courseOnUser?.course.creatorId === ctx.userId) {
      await prisma.courseOnUser.delete({
        where: {
          userId_courseId: {
            userId: parsedInput.userId,
            courseId: parsedInput.courseId,
          },
        },
      });
      return `${courseOnUser?.user.name} successfully removed from ${courseOnUser?.course.name}`;
    } else {
      throw new Error(
        "You must be the owner of this course to remove a member"
      );
    }
  });
