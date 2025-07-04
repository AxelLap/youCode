"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { CourseState, User } from "@prisma/client";
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
    creator: User;
  };
};

export const CourseRow = ({ course }: CourseRowProps) => {
  const router = useRouter();
  return (
    <TableRow
      className="cursor-pointer mt-2 h-[60px] max-h-[60px] w-full items-center"
      key={course.id}
      onClick={() => {
        router.push(`/courses/${course.id}`);
      }}
    >
      <TableCell className="flex justify-center items-center">
        <UserAvatar imageUrl={course.image} />
      </TableCell>
      <TableCell>
        <h3>{course.name}</h3>
      </TableCell>
      <TableCell className="flex justify-center items-center gap-2">
        <UserAvatar imageUrl={course.creator.image} />
        {course.creator.name}
      </TableCell>
    </TableRow>
  );
};
