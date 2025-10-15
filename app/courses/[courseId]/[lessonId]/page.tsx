import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Error from "../../../admin/courses/error";
import { isCourseMember } from "../../user-course.query";

import { SideBarWrapper } from "@/components/layout/SidebarWrapper";
import { LessonList } from "../LessonsList";
import { LessonContent } from "./LessonContent";
import { UpdateProgressBtn } from "./UpdateProgressBtn";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string; courseId: string }>;
}) {
  const { lessonId, courseId } = await params;

  // Auth
  const session = await getAuthSession();
  const userId = session?.user.id;
  if (!userId) return <Error />;

  // Membership
  const isMember = await isCourseMember({ courseId, userId });

  // Fetch course + lessons + lessonOnUser
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      lessons: {
        include: {
          users: {
            where: {
              userId: userId,
            },
          },
        },
        orderBy: {
          rank: "asc",
        },
      },
    },
  });

  if (!course) return <Error />;

  const lessons = course.lessons;
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson || (!isMember && lesson.state !== "PUBLIC")) return <Error />;

  const nextLessonId = lessons.find((l) => l.rank > lesson?.rank)?.id;
  console.log(`NextLessonId : ${nextLessonId}`);

  return (
    <section className="flex justify-start items-start">
      <SideBarWrapper
        sidebarContent={
          <LessonList
            lessons={lessons}
            courseId={courseId}
            isMember={isMember}
            lessonId={lessonId}
          />
        }
      >
        <LessonContent
          name={lesson.name}
          content={lesson.content}
          lessonId={lesson.id}
          userId={userId}
        >
          <>
            {lesson.users.length !== 0 && (
              <UpdateProgressBtn
                progress={lesson.users[0].progress}
                lessonId={lessonId}
                nextLessonId={nextLessonId}
                courseId={courseId}
              />
            )}
          </>
        </LessonContent>
      </SideBarWrapper>
    </section>
  );
}
