// components/admin/DragAndDropArea.tsx
"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Lesson } from "@prisma/client";
import { SortableLesson } from "./SortableLesson"; // assure-toi du bon chemin

type Props = {
  initialLessons: Lesson[];
};

export const DragAndDropArea = ({ initialLessons }: Props) => {
  const [lessons, setLessons] = useState(initialLessons);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = lessons.findIndex((l) => l.id === active.id);
      const newIndex = lessons.findIndex((l) => l.id === over.id);

      setLessons((prevLessons) => arrayMove(prevLessons, oldIndex, newIndex));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={lessons.map((lesson) => lesson.id)}
        strategy={verticalListSortingStrategy}
      >
        {lessons.map((lesson) => (
          <SortableLesson key={lesson.id} lesson={lesson} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
