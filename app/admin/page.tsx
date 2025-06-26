import { NewCourseBtn } from "@/components/features/NewCourseBtn";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function adminPage() {
  return (
    <Card className="w-lg m-auto mt-4">
      <CardHeader>
        <CardTitle>
          <h2>Admin Page</h2>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-center justify-center">
        <Link
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-fit"
          )}
          href="/admin/courses"
        >
          My Courses
        </Link>
        <NewCourseBtn />
      </CardContent>
    </Card>
  );
}
