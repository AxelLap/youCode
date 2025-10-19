import { CoursesTable } from "@/components/features/admin/CoursesTable";
import { NewCourseBtn } from "@/components/features/admin/NewCourseBtn";
import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";

import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { QuicStats } from "./QuicStats";

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
    <Layout className="max-w-screen h-full">
      <div className="w-full h-full flex gap-2 justify-between ">
        <Card className="w-[40%] h-full m-4 p-4 flex flex-col">
          <CardHeader>
            <CardTitle className="w-fit m-auto">
              <Typography as="h2" variant="h3">
                Quick stats
              </Typography>
            </CardTitle>
          </CardHeader>

          <CardContent>
            {session && <QuicStats userId={session.user.id} />}
          </CardContent>
        </Card>
        <div className="w-[55%] flex flex-col gap-2">
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
        </div>
      </div>
    </Layout>
  );
}
