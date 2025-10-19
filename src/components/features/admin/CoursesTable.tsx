import { AdminCourseRow } from "@/components/features/admin/AdminCourseRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Course } from "@prisma/client";

type CoursesTableProps = {
  courses: Course[];
};

export const CoursesTable = ({ courses }: CoursesTableProps) => {
  return (
    <Table className="w-full m-auto">
      <TableHeader>
        <TableRow className="flex w-full">
          <TableHead className="text-center w-1/4">Image</TableHead>
          <TableHead className="text-center w-2/4">Name</TableHead>
          <TableHead className="text-center w-1/4">state</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses &&
          courses.map((course) => (
            <AdminCourseRow key={course.id} course={course} />
          ))}
      </TableBody>
    </Table>
  );
};
