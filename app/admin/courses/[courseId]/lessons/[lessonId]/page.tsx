import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import Link from "next/link";
import { getLesson } from "../admin-lesson.query";

export default async function CoursePage({
  params,
}: {
  params: {
    courseId: string;
    lessonId: string;
  };
}) {
  const session = await getRequiredAuthSession();
  const lesson = await getLesson({
    lessonId: params.lessonId,
    userId: session?.user.id,
  });

  if (!lesson) {
    return;
  }

  return (
    <Layout className="w-full flex flex-col">
      <PageHeader pageName={`${lesson.name}`}>
        <Link
          href={`/admin/courses/${params.courseId}/lessons/${params.lessonId}/edit`}
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "ml-auto p-2"
          )}
        >
          <Edit />
        </Link>
      </PageHeader>
      <div className="w-full flex flex-col gap-2">
        <Card className="w-full ">
          <CardContent className="flex  gap-3 flex items-center">
            <div className="flex gap-2">
              <span>Status : </span>
              <Badge
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
            </div>
            <div className="flex gap-2 ml-auto">
              <span>Created at :</span>
              <span>{new Date(lesson.createdAt).toLocaleDateString("fr")}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent className="flex flex-col gap-2">
            <div className="flex gap-2 flex-col">
              <span>content : </span>
              <p>{lesson.content}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
