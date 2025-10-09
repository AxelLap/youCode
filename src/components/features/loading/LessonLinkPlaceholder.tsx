"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const LessonLinkPlaceholder = () => {
  return (
    <div className="w-full flex mx-2 p-1 gap-4 justify-center">
      <Skeleton className="flex justify-center h-10 p-2 w-[20%] rounded-md items-center "></Skeleton>
      <Skeleton className="flex justify-center h-10 p-2 w-[80%] rounded-md items-center"></Skeleton>
    </div>
  );
};
