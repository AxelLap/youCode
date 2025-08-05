import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";

import { LessonForm } from "../[lessonId]/settings/LessonForm";

export default async function AddNewLessonPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  return (
    <Layout>
      <PageHeader pageName="Add new lesson" />
      <LayoutContent>
        <LessonForm courseId={params.courseId} />
      </LayoutContent>
    </Layout>
  );
}
