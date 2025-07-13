import { generateCourseId } from "@/lib/generate-id";
import { prisma } from "@/lib/prisma";
import { Course } from "@prisma/client";

export async function getAdminCourse({
  courseId,
  userId,
  page,
}: {
  courseId: string;
  userId: string;
  page: number;
}) {
  const course = await prisma.course.findUnique({
    where: {
      creatorId: userId,
      id: courseId,
    },
    select: {
      id: true,
      name: true,
      image: true,
      state: true,
      users: {
        take: 5,
        skip: Math.max(0, page * 5),
        select: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  // Fonction pour passer de [
  //   { user: { id: "1", name: "Alice", image: "a.jpg" } },
  //   { user: { id: "2", name: "Bob", image: "b.jpg" } },
  // ]; à [
  //   { id: "1", name: "Alice", image: "a.jpg" },
  //   { id: "2", name: "Bob", image: "b.jpg" },
  // ];
  const users = course?.users.map((u) => {
    return {
      ...u.user,
    };
  });

  return {
    ...course,
    users,
  };
}

export async function addCourse(
  formData: { name: string; image: string; presentation: string },
  user: {
    id: string;
    email?: string | undefined;
    image?: string | undefined;
    name?: string | undefined;
  }
) {
  const newCourse: Course = await prisma.course.create({
    data: {
      id: generateCourseId(),
      name: formData.name,
      presentation: formData.presentation,
      image: formData.image,
      createdAt: new Date(),
      creatorId: user.id,
      state: "DRAFT",
    },
    include: {
      creator: true,
      lessons: true,
      users: true,
    },
  });

  return newCourse;
}

export async function getLessons(courseId: string) {
  const courseWithLessons = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      name: true,
      lessons: {
        select: {
          id: true,
          name: true,
          state: true,
        },
      },
    },
  });

  if (!courseWithLessons) {
    throw new Error("Course not found");
  }

  return {
    course: courseWithLessons.name,
    lessons: courseWithLessons.lessons,
  };
}
