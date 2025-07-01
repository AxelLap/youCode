import { LayoutTitle } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Menu } from "lucide-react";
import { getLessons } from "../admin-course.query";

export default async function LessonsPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const lessons = await getLessons(params.courseId);

  const courseName = lessons?.course;

  return (
    <div className="w-full flex flex-col p-6">
      <LayoutTitle>Lessons • {courseName}</LayoutTitle>
      <Card className="w-[90%] p-2 mx-auto my-5">
        <CardHeader>
          <CardTitle className="p-2">Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>name</TableHead>
                <TableHead>status</TableHead>
                <TableHead>action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons &&
                lessons.lessons.map((lesson) => (
                  <TableRow className="cursor-pointer">
                    <TableCell>{lesson.name}</TableCell>
                    <TableCell>{lesson.state}</TableCell>
                    <TableCell>
                      <Menu />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
