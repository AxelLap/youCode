import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Edit, Grip, Trash } from "lucide-react";
import Link from "next/link";
import { AdminLessonItemType } from "../../admin-course.query";

type AdminSortableItemProps = {
  courseId: string;
  lesson: AdminLessonItemType;
};

export const AdminSortableItem = ({
  lesson,
  courseId,
}: AdminSortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        key={lesson.id}
        className="bg-black flex w-full h-[35px] gap-4 pl-4 pr-2 my-3 mx-auto rounded-md items-center hover:bg-black duration-300 transition-easeIn cursor-pointer"
      >
        <Link href={`/admin/courses/${courseId}/lessons/${lesson.id}`}>
          <span className="w-3/4 overflow-hidden truncate ">{lesson.name}</span>
        </Link>

        <div className="flex gap-2 ml-auto">
          <Link
            href={`/admin/courses/${courseId}/lessons/${lesson.id}/edit`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full w-6 h-6 p-2 cursor-pointer"
            )}
          >
            <Edit />
          </Link>
          <Button
            className="rounded-full w-6 h-6 p-2 cursor-pointer"
            variant="destructive"
          >
            <Trash />
          </Button>
          <Badge
            className="w-20"
            variant={
              lesson.state === "HIDDEN"
                ? "destructive"
                : lesson.state === "PUBLISHED"
                ? "secondary"
                : "outline"
            }
          >
            <span>{lesson.state}</span>
          </Badge>
          <Grip className="ml-2 cursor-move" {...listeners} />
        </div>
      </div>
    </div>
  );
};
