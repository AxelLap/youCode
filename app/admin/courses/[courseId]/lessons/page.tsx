import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getLessons } from "../../admin-course.query";
import { DragAndDropArea } from "./DragAndDropArea";

export default async function LessonsPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const lessons = await getLessons(params.courseId);

  const courseName = lessons?.course;

  return (
    <Layout>
      <PageHeader pageName={`Lessons • ${courseName}`} />
      <Card className="w-[90%] p-2 mx-auto gap-0">
        <CardHeader>
          <CardTitle className="p-2">Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          <DragAndDropArea items={lessons.lessons} courseId={params.courseId} />
        </CardContent>
        <CardFooter>
          <Link
            href={`/admin/courses/${params.courseId}/lessons/addNew`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex items-center justify-center gap-2 my-4 mx-auto cursor-pointer"
            )}
          >
            <PlusCircle />
            <span>Add new lesson</span>
          </Link>
        </CardFooter>
      </Card>
    </Layout>
  );
}
