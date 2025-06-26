import { NewCourseBtn } from "@/components/features/NewCourseBtn";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
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

  console.log(courses);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>My Courses</LayoutTitle>
        <NewCourseBtn />
      </LayoutHeader>
      <LayoutContent>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="m-auto">Name</TableHead>
              <TableHead className="m-auto">Image</TableHead>
              <TableHead className="m-auto">state</TableHead>
              <TableHead className="m-auto">Presentation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {session &&
              courses.map((c) => (
                <TableRow>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>
                    <img
                      height={100}
                      width={100}
                      className="rounded-md"
                      src={c.image}
                    />
                  </TableCell>
                  <TableCell>{c.state}</TableCell>
                  <TableCell>{c.presentation}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </LayoutContent>
    </Layout>
  );
}
