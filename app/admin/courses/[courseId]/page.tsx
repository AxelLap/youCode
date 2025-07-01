import { PaginationBtn } from "@/components/features/PaginationButn";
import { UserAvatar } from "@/components/features/UserAvatar";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
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
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import Error from "../error";
import { getAdminCourse } from "./admin-course.query";

export default async function CoursePage({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 0);

  const session = await getRequiredAuthSession();

  const course = await getAdminCourse({
    courseId: params.courseId,
    userId: session.user.id,
    page: page,
  });

  if (!course) {
    return <Error />;
  }

  return (
    <Layout>
      <PageHeader pageName={`Course • ${course.name}`} />
      <div className="w-full flex gap-2">
        <div className="flex gap-4 w-full p-4 justify-center md:flex-row flex-col">
          <Card className="w-[90%] flex flex-col m-auto">
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
                  {course._count?.users !== 0 ? (
                    course.users?.map((couseUser) => (
                      <TableRow key={couseUser.id}>
                        <TableCell>
                          <UserAvatar imageUrl={couseUser.image} />
                        </TableCell>
                        <TableCell>{couseUser.name}</TableCell>
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
              <PaginationBtn
                baseUrl={`/admin/courses/${course.id}`}
                totalUsers={course?._count?.users ?? 0}
                page={page}
              />
            </CardContent>
          </Card>
          <Card className="md:w-1/3 flex flex-col w-[90%] h-full m-auto">
            <CardContent className="flex flex-col gap-4">
              <div className="flex gap-4 items-center p-2">
                <div className="flex flex-col gap4 w-2/3">
                  <span>{course._count?.users} users</span>
                  <span>{course._count?.lessons} lessons</span>
                </div>

                <span
                  className={cn(
                    buttonVariants(
                      course.state === "DRAFT"
                        ? { variant: "destructive" }
                        : { variant: "outline" }
                    ),
                    "w-1/3"
                  )}
                >
                  {course.state}
                </span>
              </div>
              <Button className="p-2 w-2/3 m-auto" variant="outline">
                Edit
              </Button>
              <Link
                href={`/admin/courses/${params.courseId}/lessons`}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "p-2 w-2/3 m-auto"
                )}
              >
                Edit Lessons
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
