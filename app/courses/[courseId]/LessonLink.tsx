"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@prisma/client";

import { Crown, Hourglass, LockIcon } from "lucide-react";
import { PropsWithChildren, ReactNode } from "react";
type LessonLinkProps = {
  isAvailable: boolean;
  children: ReactNode;
  name: string;
  index: number;
  progress?: Progress;
};
export const LessonLink = ({
  isAvailable,
  name,
  index,
  children,
  progress,
}: PropsWithChildren<LessonLinkProps>) => {
  if (isAvailable) {
    return (
      <div className="w-full flex mx-2 gap-4 justify-center relative">
        <span
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex justify-center h-10 p-2 w-[20%] rounded-md items-center relative"
          )}
        >
          {progress === "COMPLETED" ? (
            <Crown />
          ) : progress === "IN_PROGRESS" ? (
            <Hourglass />
          ) : (
            <span>{index + 1}</span>
          )}
        </span>
        {children}
      </div>
    );
  } else {
    return (
      <div className="w-full flex mx-2 gap-4 justify-center">
        <span
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex justify-center h-10 p-2 w-[20%] rounded-md items-center"
          )}
        >
          <LockIcon />
        </span>
        <p
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "flex justify-start h-10 p-2 w-[80%] rounded-md items-center gap-2 overflow-hidden truncate cursor-not-allowed"
          )}
        >
          {name}
        </p>
      </div>
    );
  }
};
