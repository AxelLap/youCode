import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Typography } from "@/components/ui/Typography";
import { prisma } from "@/lib/prisma";

import { CourseForm } from "./CourseForm";

export default async function CourseSettingsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  return (
    <Layout>
      <PageHeader pageName={`${course?.name}'s settings`} />
      <LayoutContent>
        <Typography variant={"h3"} as={"h3"}>
          {course?.name}
        </Typography>
        {course && <CourseForm defaultValue={course} />}
      </LayoutContent>
    </Layout>
  );
}
