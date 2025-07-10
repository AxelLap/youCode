import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export const NewCourseBtn = () => {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "w-fit flex gap-2 m-auto"
      )}
      href="/admin/courses/addnew"
    >
      <PlusCircle />
      Create New
    </Link>
  );
};
