import { AdminCourseRow } from "@/components/features/AdminCourseRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CourseRow } from "./CourseRow";

type CoursesTableProps = {
  courses: {
    id: string;
    name: string;
    presentation: string;
    image: string;
    createdAt: Date;
    creatorId: string;
    state: "DRAFT" | "PUBLISHED";
    creator: {
      image: string | null;
      id: string;
      name: string | null;
      createdAt: Date;
      email: string | null;
      emailVerified: Date | null;
      updatedAt: Date;
    };
  }[];
  isAdmin: boolean;
};

export const CoursesTable = ({ courses, isAdmin }: CoursesTableProps) => {
  return (
    <Table className="w-3/4 m-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>{isAdmin ? "state" : "CreatedBy"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses &&
          courses.map((course) =>
            isAdmin ? (
              <AdminCourseRow key={course.id} course={course} />
            ) : (
              <CourseRow key={course.id} course={course} />
            )
          )}
      </TableBody>
    </Table>
  );
};
