import { Layout } from "@/components/layout/Layout";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Error from "../../../admin/courses/error";
import { isCourseMember } from "../../user-course.query";

import { SideBarWrapper } from "@/components/layout/SidebarWrapper";
import { LessonList } from "../LessonsList";
import { LessonContent } from "./LessonContent";

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
      },
    },
  });

  if (!course) return <Error />;

  const lessons = course.lessons;
  const lesson = lessons.find((l) => l.id === lessonId);

  if (!lesson || (!isMember && lesson.state !== "PUBLIC")) return <Error />;

  return (
    <Layout className="min-h-[60vh] max-w-[90%]">
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
        />
      </SideBarWrapper>
    </Layout>
  );
}
