import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { LessonForm } from "./LessonForm";
import { MdxEditor } from "./content/MdxEditor";

export default async function LessonSettingsPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.lessonId,
    },
    include: {
      course: true,
    },
  });

  if (!lesson) {
    return;
  }

  return (
    <Layout className="max-w-5xl">
      <PageHeader pageName={`${lesson?.name}'s editor`} />
      <LayoutContent className="flex gap-2 w-full">
        <Card className="w-1/4">
          <CardContent className="flex flex-col gap-2">
            <span>Details :</span>
            <LessonForm
              defaultValues={{
                name: lesson?.name,
                state: lesson?.state,
                id: lesson.id,
              }}
            />
          </CardContent>
        </Card>
        <Card className="w-3/4 min-h-full">
          <CardHeader>
            <span>Content :</span>
          </CardHeader>
          <CardContent>
            <MdxEditor
              lessonId={lesson.id}
              markdown={lesson.content}
            ></MdxEditor>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
