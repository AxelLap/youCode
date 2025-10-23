"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@prisma/client";
import { Crown, Hourglass } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateLessonProgress } from "./user-lesson.action";

type UpdateProgressBtnProps = {
  progress: Progress;
  lessonId: string;
  courseId: string;
  nextLessonId?: string | undefined;
};

export const UpdateProgressBtn = ({
  progress,
  lessonId,
  nextLessonId,
  courseId,
}: UpdateProgressBtnProps) => {
  const router = useRouter();
  if (progress === "COMPLETED") {
    return (
      <Button
        onClick={async () => {
          const updatedLesson = await updateLessonProgress({
            lessonId,
            progress: "IN_PROGRESS",
          });

          if (!updatedLesson) {
            throw new Error("Something went wrong");
          } else {
            router.push(`/courses/${courseId}/${lessonId}`);
            router.refresh();
            toast("lesson marked as in progress");
          }
        }}
        className="w-fit flex gap-2 h-8 rounded-full mx-auto"
      >
        <Crown size={32} className="mr-auto" />
        <span>Mark as in progress</span>
      </Button>
    );
  } else {
    return (
      <Button
        onClick={async () => {
          const updatedLesson = await updateLessonProgress({
            lessonId,
            progress: "COMPLETED",
          });
          if (!updatedLesson) {
            throw new Error("Something went wrong");
          } else {
            if (nextLessonId) {
              router.push(`/courses/${courseId}/${nextLessonId}`);
              toast("lesson completed");
            } else {
              router.push(`/mycourses`);
            }
          }
        }}
        className="w-fit flex gap-2 h-8  rounded-full"
      >
        <Hourglass size={32} className="mr-auto" />
        <span>Mark as completed</span>
      </Button>
    );
  }
};
