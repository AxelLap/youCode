import { NewCourseBtn } from "@/components/features/NewCourseBtn";
import { Layout, LayoutContent } from "@/components/layout/Layout";
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
import Link from "next/link";

export default async function adminCoursesPage() {
  const session = await getRequiredAuthSession();

  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id,
    },
  });

  return (
    <Layout>
      <div className="w-full flex justify-between items-center p-4">
        <h2 className="w-fit text-2xl">My Courses</h2>
        <NewCourseBtn />
      </div>
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
                <TableRow className="cursor-pointer mt-2" key={c.id}>
                  <TableCell>
                    <Link href={`/admin/courses/${c.id}`}>{c.name}</Link>
                  </TableCell>
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
