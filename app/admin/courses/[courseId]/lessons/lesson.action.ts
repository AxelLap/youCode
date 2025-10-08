"use server";
import { prisma } from "@/lib/prisma";
import { authAction } from "@/lib/safe-action";
import { z } from "zod";
import { generateMiddleRank } from "./generateMiddleRank";
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
    const lessonsRanks = await prisma.lesson.findMany({
      where: {
        courseId: parsedInput.courseId,
      },
      select: {
        rank: true,
      },
    });

    console.log(lessonsRanks);

    const latestLessonRank = lessonsRanks.reduce((a, b) =>
      a.rank > b.rank ? a : b
    );
    console.log(latestLessonRank);

    const newRank = generateMiddleRank(latestLessonRank.rank, undefined);

    if (ctx.userId) {
      const createdLesson = await prisma.lesson.create({
        data: {
          name: parsedInput.data.name,
          state: parsedInput.data.state,
          rank: newRank,
          courseId: parsedInput.courseId,
          content: "",
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

const saveLessonMoveSchema = z.object({
  upItemRank: z.string().optional(),
  downItemRank: z.string().optional(),
  lessonId: z.string(),
});

export const saveLessonMove = authAction
  .inputSchema(saveLessonMoveSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { upItemRank, downItemRank, lessonId } = parsedInput;

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        course: true,
      },
    });

    const newRank = generateMiddleRank(upItemRank, downItemRank);
    if (lesson?.course.creatorId === ctx.userId) {
      const lessonWithNewRank = await prisma.lesson.update({
        where: {
          id: lessonId,
        },
        data: {
          rank: newRank,
        },
      });

      return lessonWithNewRank;
    }
  });

const ContentActionUpdateProp = z.object({
  lessonId: z.string(),
  content: z.string(),
});

export const contentActionUpdate = authAction
  .inputSchema(ContentActionUpdateProp)
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
        data: {
          content: parsedInput.content,
        },
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
