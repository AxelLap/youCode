"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { CourseState } from "@prisma/client";
import { useRouter } from "next/navigation";
import { UserAvatar } from "./UserAvatar";

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

export const CourseRow = ({ course }: CourseRowProps) => {
  const router = useRouter();
  return (
    <TableRow
      className="cursor-pointer mt-2 h-[60px] max-h-[60px] w-full"
      key={course.id}
      onClick={() => {
        router.push(`/admin/courses/${course.id}`);
      }}
    >
      <TableCell>
        <h3>{course.name}</h3>
      </TableCell>
      <TableCell>
        <UserAvatar imageUrl={course.image} />
      </TableCell>
      <TableCell>{course.state}</TableCell>
    </TableRow>
  );
};
