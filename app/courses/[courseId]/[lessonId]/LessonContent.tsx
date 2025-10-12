import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { toast } from "sonner";
import Error from "../../../admin/courses/error";
import { UpdateProgressBtn } from "./UpdateProgressBtn";
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
}: LessonContentProps) => {
  const progress = await getLessonOnUserProgress({ userId, lessonId });

  if (!progress) {
    return <Error />;
  }

  if (progress?.progress === "NOT_STARTED") {
    const lessonStarted = await updateLessonProgress({
      lessonId,
      progress: "IN_PROGRESS",
    });
    if (lessonStarted) {
      toast("Lesson started !");
    }
  }
  console.log(lessonId);

  return (
    <Card className="w-full mx-auto flex flex-col gap-2 relative">
      <CardHeader>
        <CardTitle>
          <Typography variant={"h3"} as={"h2"} className="text-center">
            {name}
          </Typography>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Typography as={"p"}>{content}</Typography>
        <UpdateProgressBtn lessonId={lessonId} progress={progress.progress} />
      </CardContent>
    </Card>
  );
};
