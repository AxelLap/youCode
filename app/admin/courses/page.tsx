import { CourseRow } from "@/components/features/CourseRow";
import { NewCourseBtn } from "@/components/features/NewCourseBtn";
import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function adminCoursesPage() {
  const session = await getRequiredAuthSession();

  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id,
    },
  });

  return (
    <Layout>
      <PageHeader
        imageUrl={session?.user.image}
        userName={session?.user.name}
        pageName="Courses"
      />
      <LayoutContent>
        <Table className="w-3/4 m-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>state</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {session &&
              courses.map((course) => (
                <CourseRow key={course.id} course={course} />
              ))}
          </TableBody>
        </Table>
      </LayoutContent>
      <NewCourseBtn />
    </Layout>
  );
}
