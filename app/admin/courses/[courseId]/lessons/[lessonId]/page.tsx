import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
        <Card>
          <CardHeader>
            Status :{" "}
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
          </CardHeader>
          <CardContent>{lesson.content}</CardContent>
        </Card>
      </div>
    </Layout>
  );
}
