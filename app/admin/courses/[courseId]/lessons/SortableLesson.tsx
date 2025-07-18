// components/admin/SortableLesson.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Lesson } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

export const SortableLesson = ({ lesson }: { lesson: Lesson }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id }); // Attention ici : id, pas rank !

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex w-full gap-4 p-4 m-1 rounded-md items-center hover:bg-black duration-300 transition-easeIn cursor-pointer"
    >
      <span className="w-3/4 overflow-hidden truncate ">{lesson.name}</span>
      <div className="flex gap-2 ml-auto">
        <Badge
          variant={
            lesson.state === "HIDDEN"
              ? "destructive"
              : lesson.state === "PUBLISHED"
              ? "secondary"
              : "outline"
          }
        >
          <p>{lesson.state}</p>
        </Badge>
        <Link
          href={`/admin/courses/${lesson.courseId}/lessons/${lesson.id}/settings`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "cursor-pointer"
          )}
        >
          <Edit />
        </Link>
        <Button className="cursor-pointer" variant="destructive">
          <Trash />
        </Button>
      </div>
    </div>
  );
};
