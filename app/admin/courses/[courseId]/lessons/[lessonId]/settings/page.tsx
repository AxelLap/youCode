import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { prisma } from "@/lib/prisma";
import { LessonForm } from "./LessonForm";

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
    <Layout>
      <PageHeader pageName={`${lesson?.name}'s settings`} />
      <LayoutContent>
        <LessonForm
          defaultValues={{
            name: lesson?.name,
            state: lesson?.state,
            content: lesson?.content,
            id: lesson.id,
          }}
        />
      </LayoutContent>
    </Layout>
  );
}
