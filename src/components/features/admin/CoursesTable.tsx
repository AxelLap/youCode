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
    <Table className="w-3/4 m-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>state</TableHead>
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
