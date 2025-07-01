import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
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

  console.log(lessons);

  return (
    <Layout>
      <PageHeader pageName={`Lessons • ${courseName}`} />
      <Card className="w-[90%] p-2 mx-auto gap-0">
        <CardHeader>
          <CardTitle className="p-2">Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          {lessons &&
            lessons.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex w-full gap-4 p-4 m-1 rounded-md items-center hover:bg-black duration-300 transition-easeIn cursor-pointer"
              >
                <span className="w-3/4 overflow-hidden truncate ">
                  {lesson.name}
                </span>
                <div className="flex gap-2 ml-auto">
                  <Badge
                    variant={
                      lesson.state === "HIDDEN"
                        ? "destructive"
                        : lesson.state === "PUBLISHED"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    <p>{lesson.state}</p>
                  </Badge>
                  <Menu />
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </Layout>
  );
}
