import { ImageCourse } from "@/components/features/courses/ImageCourse";
import { UserAvatar } from "@/components/features/images/UserAvatar";
import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Error from "../../../admin/courses/error";
import { CourseDialog } from "./CourseDialog";

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

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      lessons: true,
      users: true,
      creator: true,
    },
  });

  return (
    <CourseDialog>
      <Layout className="w-full">
        <LayoutContent className="flex gap-2">
          <div className="flex flex-col w-full h-full gap-4">
            <div className="flex gap-2 items-center">
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
            </div>

            <Card>
              <CardContent>
                <Typography as={"h4"} variant={"h3"}>
                  Description :{" "}
                </Typography>
                <p className="m-1 p-1">{course?.presentation}</p>
              </CardContent>
            </Card>
          </div>
        </LayoutContent>
      </Layout>
    </CourseDialog>
  );
}
