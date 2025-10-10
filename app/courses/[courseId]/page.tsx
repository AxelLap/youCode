import { ImageCourse } from "@/components/features/courses/ImageCourse";
import { UserAvatar } from "@/components/features/images/UserAvatar";
import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Error from "../../admin/courses/error";
import { isCourseMember } from "../user-course.query";
import { JoinCourseBtn } from "./JoinCourseBtn";
import { LessonList } from "./LessonsList";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const session = await getAuthSession();
  const userId = session?.user.id;

  if (!userId) {
    return <Error />;
  }

  const isMember = await isCourseMember({
    courseId: courseId,
    userId: userId,
  });

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      users: true,
      creator: true,
      lessons: {
        include: {
          users: {
            where: {
              userId: userId,
            },
            select: {
              progress: true,
              lessonId: true,
            },
          },
        },
      },
    },
  });

  const lessons = course?.lessons;

  if (!lessons) {
    return;
  }

  return (
    <Layout className="max-w-[80%]">
      <LayoutContent className="flex flex-row gap-[2%] justify-center ">
        <div className="flex flex-col w-[59%] h-[60vh] gap-4 ">
          <Card className="w-full h-[40%] flex flex-row gap-0 ltr p-0 items-center">
            <ImageCourse url={course?.image} />
            <div className="w-[40%] mx-auto flex flex-col items-center gap-4 py-3">
              <Typography variant={"h3"} as={"h2"} className="text-center">
                {course?.name}
              </Typography>
              <div className="flex gap-2 items-center">
                <span>by :</span>
                <UserAvatar imageUrl={course?.creator.image} />
                <span>{course?.creator.name}</span>
              </div>
            </div>
          </Card>
          <Card className="h-full">
            <CardContent>
              <Typography as={"h4"} variant={"h3"}>
                Description :{" "}
              </Typography>
              <p className="m-1 p-1">{course?.presentation}</p>
            </CardContent>
          </Card>
        </div>
        <div className="w-[39%]">
          {lessons && (
            <LessonList
              lessons={lessons}
              isMember={isMember}
              courseId={courseId}
            />
          )}
        </div>
      </LayoutContent>
      {!isMember && <JoinCourseBtn courseId={courseId} />}
    </Layout>
  );
}
