import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Error from "../../../admin/courses/error";
import { isCourseMember } from "../../user-course.query";
import { LessonList } from "../LessonsList";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string; courseId: string }>;
}) {
  const { lessonId, courseId } = await params;

  const session = await getAuthSession();
  const userId = session?.user.id;

  if (!userId) {
    return <Error />;
  }

  const isMember = await isCourseMember({
    courseId: courseId,
    userId: userId,
  });

  const rawLesson = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      lessons: {
        where: {
          id: lessonId,
        },
      },
    },
  });

  const lesson = rawLesson?.lessons[0];

  if (!isMember && lesson?.state !== "PUBLIC") {
    return <Error />;
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

  return (
    <Layout className="min-h-[60vh] max-w-[90%]">
      <LayoutContent className="flex flex-row gap-2">
        <Card className="w-3/4 flex flex-col gap-2">
          <CardHeader>
            <CardTitle>
              <Typography variant={"h3"} as={"h2"} className="text-center">
                {lesson?.name}
              </Typography>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography as={"p"}>{lesson?.content}</Typography>
          </CardContent>
        </Card>

        <LessonList
          courseId={courseId}
          isMember={isMember}
          lessonId={lessonId}
        ></LessonList>
      </LayoutContent>
    </Layout>
  );
}
