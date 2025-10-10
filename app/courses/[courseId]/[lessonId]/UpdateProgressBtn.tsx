import { Button } from "@/components/ui/button";
import { Progress } from "@prisma/client";
import { Crown, Hourglass } from "lucide-react";
import { updateLessonProgress } from "./user-lesson.query";

type UpdateProgressBtnProps = {
  progress: Progress;
  userId: string;
  lessonId: string;
};

export const UpdateProgressBtn = ({
  progress,
  userId,
  lessonId,
}: UpdateProgressBtnProps) => {
  if (progress === "COMPLETED") {
    return (
      <Button
        onClick={() => {
          updateLessonProgress({ userId, lessonId, progress: "COMPLETED" });
        }}
        className="w-fit flex gap-2 h-8 absolute rounded-full right-10 -bottom-12"
      >
        <Crown size={32} className="mr-auto" />
        <span>Mark as in progress</span>
      </Button>
    );
  } else {
    return (
      <Button
        onClick={() => {
          updateLessonProgress({
            userId,
            lessonId,
            progress: "IN_PROGRESS",
          });
        }}
        className="w-fit flex gap-2 h-8 absolute rounded-full right-10 -bottom-12"
      >
        <Hourglass size={32} className="mr-auto" />
        <span>Mark as completed</span>
      </Button>
    );
  }
};
