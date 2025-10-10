"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { courseOnUserActionCreate } from "../user-course.actions";

type JoinCourseBtnProps = {
  courseId: string;
};

export const JoinCourseBtn = ({ courseId }: JoinCourseBtnProps) => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        const { data, serverError } = await courseOnUserActionCreate({
          courseId: courseId,
        });

        if (serverError) {
          throw new Error(serverError);
        }

        if (data) {
          toast(`${data.message}`);
          router.refresh();
        }
      }}
      className="w-fit p-4 mx-auto my-4"
      variant="secondary"
    >
      Join this class
    </Button>
  );
};
