import { CoursesTable } from "@/components/features/CoursesTable";
import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CoursesPage() {
  const session = await getRequiredAuthSession();

  const courses = await prisma.course.findMany({
    where: {
      users: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      creator: true,
    },
  });

  return (
    <Layout>
      <PageHeader pageName="My courses" />
      <LayoutContent>
        <CoursesTable courses={courses} isAdmin={false} />
      </LayoutContent>
    </Layout>
  );
}
