"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { CourseState } from "@prisma/client";
import { useRouter } from "next/navigation";
import { UserAvatar } from "../images/UserAvatar";

type CourseRowProps = {
  course: {
    id: string;
    name: string;
    presentation: string;
    image: string;
    createdAt: Date;
    creatorId: string;
    state: CourseState;
  };
};

export const AdminCourseRow = ({ course }: CourseRowProps) => {
  const router = useRouter();
  return (
    <TableRow
      className="flex cursor-pointer mt-2 h-[60px] max-h-[60px] w-full items-center"
      key={course.id}
      onClick={() => {
        router.push(`/admin/courses/${course.id}`);
      }}
    >
      <TableCell className="flex justify-center items-center w-1/4">
        <UserAvatar imageUrl={course.image} />
      </TableCell>
      <TableCell className="flex justify-center items-center w-2/4">
        <h3>{course.name}</h3>
      </TableCell>
      <TableCell className="flex justify-center items-center w-1/4">
        {course.state}
      </TableCell>
    </TableRow>
  );
};
