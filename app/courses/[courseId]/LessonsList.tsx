import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LessonLink } from "./LessonLink";

type LessonListProps = {
  courseId: string;
  isMember: boolean;
  lessonId?: string;
};

export const LessonList = async ({
  isMember,
  courseId,
  lessonId,
}: LessonListProps) => {
  const lessons = await prisma.lesson.findMany({
    where: {
      courseId: courseId,
    },
  });

  return (
    <Card className=" w-auto max-h-[60vh] flex flex-col gap-4 p-3 overflow-scroll">
      <CardHeader>
        <Typography as={"h3"} variant={"h3"}>
          lessons :
        </Typography>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-2 items-center mx-auto w-3/4">
        {lessons.length !== 0 ? (
          lessons.map(
            (lesson, index) =>
              lesson.state !== "HIDDEN" && (
                <LessonLink
                  key={index}
                  isAvailable={isMember || lesson.state === "PUBLIC"}
                  name={lesson.name}
                  index={index}
                >
                  <Link
                    className={cn(
                      buttonVariants(
                        lessonId === lesson.id
                          ? { variant: "secondary" }
                          : { variant: "outline" }
                      ),
                      "flex justify-center h-10 p-2 w-64 rounded-md items-center gap-2"
                    )}
                    href={`/courses/${courseId}/${lesson.id}`}
                  >
                    {lesson.name}
                  </Link>
                </LessonLink>
              )
          )
        ) : (
          <div className="flex flex-col gap-4 w-full justify-center items-center">
            <Typography as={"span"}>
              No lessons created yet please come back later
            </Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
