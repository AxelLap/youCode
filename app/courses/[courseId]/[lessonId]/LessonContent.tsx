import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";

import { PropsWithChildren } from "react";
import { updateLessonProgress } from "./user-lesson.action";
import { getLessonOnUserProgress } from "./user-lesson.query";

type LessonContentProps = {
  name: string | undefined;
  content: string | undefined;
  lessonId: string;
  userId: string;
};

export const LessonContent = async ({
  name,
  content,
  lessonId,
  userId,
  children,
}: PropsWithChildren<LessonContentProps>) => {
  const progress = await getLessonOnUserProgress({ userId, lessonId });

  if (progress) {
    if (progress?.progress === "NOT_STARTED") {
      await updateLessonProgress({
        lessonId,
        progress: "IN_PROGRESS",
      });
    }
  }

  return (
    <Card className="w-full h-fit mx-auto flex flex-col gap-4">
      <CardHeader>
        <CardTitle>
          <Typography variant={"h3"} as={"h2"} className="text-center">
            {name}
          </Typography>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-fit p-4 my-2 ">
        <Typography as={"p"}>{content}</Typography>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
};
