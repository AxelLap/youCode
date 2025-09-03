"use client";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { AdminLessonItemType } from "../../admin-course.query";
import { AdminSortableItem } from "./AdminSortableItem";
import { saveLessonMove } from "./lesson.action";

type DragAndDropAreaProps = {
  courseId: string;
  items: AdminLessonItemType[];
};

export const DragAndDropArea = ({
  courseId,
  items: defaultItems,
}: DragAndDropAreaProps) => {
  const router = useRouter();

  const [items, setItems] = useState(defaultItems);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);

    const newUpItem = newItems[newIndex - 1]?.rank;
    const newDownItem = newItems[newIndex + 1]?.rank;

    void saveLessonMove({
      upItemRank: newUpItem,
      downItemRank: newDownItem,
      lessonId: String(active.id),
    });

    router.push(`/admin/courses/${courseId}/lessons`);
  }

  if (!isMounted) {
    return (
      <div className="w-fit h-fit m-auto flex flex-col gap-2">
        <Loader className="animate-spin m-auto" />
        <span>Chargement...</span>
      </div>
    );
  }

  return (
    isMounted && (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((lesson) => (
            <AdminSortableItem
              courseId={courseId}
              key={lesson.id}
              lesson={lesson}
            />
          ))}
        </SortableContext>
      </DndContext>
    )
  );
};
