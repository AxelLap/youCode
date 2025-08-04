import { CoursesTable } from "@/components/features/admin/CoursesTable";
import { NewCourseBtn } from "@/components/features/admin/NewCourseBtn";
import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";

import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function adminCoursesPage() {
  const session = await getRequiredAuthSession();

  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id,
    },
    include: {
      creator: true,
    },
  });

  return (
    <Layout>
      <PageHeader
        imageUrl={session?.user.image}
        userName={session?.user.name}
        pageName="Courses"
      >
        <NewCourseBtn />
      </PageHeader>
      <LayoutContent>
        <CoursesTable courses={courses} />
      </LayoutContent>
    </Layout>
  );
}
