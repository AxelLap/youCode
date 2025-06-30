import { prisma } from "@/lib/prisma";

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
