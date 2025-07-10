import { UserAvatar } from "@/components/features/images/UserAvatar";
import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { Star, StarOff } from "lucide-react";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

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
    <Layout className="min-h-[60vh] max-w-[90%]">
      <LayoutContent className="flex flex-row gap-[2%]">
        <div className="flex flex-col w-[55%] h-full gap-4">
          <Card className="w-full h-[40%] flex flex-row gap-0 ltr p-0 items-center">
            <img
              alt="course illustration Image"
              src={course?.image}
              className="w-[45%] h-[200px] rounded-l-md object-cover"
            />
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
          <Card>
            <CardContent>
              <Typography as={"h4"} variant={"h3"}>
                Description :{" "}
              </Typography>
              <p className="m-1 p-1">{course?.presentation}</p>
            </CardContent>
          </Card>
        </div>
        <Card className=" w-[45%] flex flex-col gap-4 p-3">
          <CardHeader>
            <Typography as={"h3"} variant={"h3"}>
              lessons :
            </Typography>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-4">
            {course?.lessons.length !== 0 ? (
              course?.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "flex justify-between h-10 p-2 w-full rounded-md items-center gap-2 p-1"
                  )}
                >
                  <Typography className="flex w-1/2 items-center" as={"p"}>
                    {lesson.name}
                  </Typography>
                  <span className="flex gap-1">
                    {lesson?.rank &&
                      Array.from(lesson.rank).map((r) =>
                        r === "a" ? (
                          <Star key={Math.random()} />
                        ) : (
                          <StarOff key={Math.random()} />
                        )
                      )}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col gap-4 w-full justify-center items-center">
                <Typography as={"span"}>
                  No lessons created yet please come back later
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
