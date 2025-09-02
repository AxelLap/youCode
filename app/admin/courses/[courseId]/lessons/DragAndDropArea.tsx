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
import { useState } from "react";

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
  const [items, setItems] = useState(defaultItems);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
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
    }
  }

  return (
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
  );
};
