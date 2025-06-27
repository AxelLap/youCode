import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Error from "../error";

export default async function CoursePage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const session = await getRequiredAuthSession();

  const course = await prisma.course.findUnique({
    where: {
      creatorId: session.user.id,
      id: params.courseId,
    },
  });

  const users = await prisma.courseOnUser.findMany({
    where: {
      courseId: params.courseId,
    },
    include: {
      user: true, // 👈 on inclut la relation vers la table User
    },
  });

  const lessons = await prisma.lesson.findMany({
    where: {
      courseId: params.courseId,
    },
  });

  if (!course) {
    return <Error />;
  }

  return (
    <div className=" flex-wrap w-5/6 flex gap-4 m-auto px-10 mt-4">
      <div className="w-full flex justify-between items-center p-4">
        <h2 className="w-fit text-2xl">{course.name}</h2>
      </div>
      <div className="w-full flex gap-2">
        <div className="flex gap-4 w-full p-4 justify-center">
          <Card className="w-full flex flex-col">
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length !== 0 ? (
                    users.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <img
                            src={entry.user.image ?? ""}
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                        </TableCell>
                        <TableCell>{entry.user.name}</TableCell>
                        <TableCell>Active</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline">
                            <Menu />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <p className="text-center">
                          No users for this course yet
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="w-1/3 flex flex-col">
            <CardHeader className="flex items-center p-4">
              <img
                width={50}
                height={50}
                src={course.image}
                alt="Course illustration"
                className="rounded-full"
              />
              <CardTitle className="w-fit m-auto text-center">
                {course.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex gap-4 items-center p-2">
                <div className="flex flex-col gap4 w-1/2">
                  <span>{users.length} users</span>
                  <span>{lessons.length} lessons</span>
                </div>

                <span
                  className={cn(
                    buttonVariants(
                      course.state === "DRAFT"
                        ? { variant: "destructive" }
                        : { variant: "outline" }
                    ),
                    "w-1/2"
                  )}
                >
                  {course.state}
                </span>
              </div>
              <Button className="p-2 w-2/3 m-auto" variant="outline">
                Edit
              </Button>
              <Button className="p-2 w-2/3 m-auto" variant="outline">
                Edit Lessons
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
