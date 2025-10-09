import { CoursesWrapper } from "@/components/features/courses/CoursesWrapper";
import { CourseCardPlaceholder } from "@/components/features/loading/CourseCardPlaceholder";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";

export default function coursesPage() {
  return (
    <Layout className="max-w-[90%] ">
      <PageHeader pageName="Explorer" />
      <CoursesWrapper>
        {Array.from({ length: 9 }).map((r, i) => (
          <CourseCardPlaceholder key={i} />
        ))}
      </CoursesWrapper>

      <Skeleton className="flex items-center justify-center p-2 gap-2 w-[300px] m-auto relative h-8" />
    </Layout>
  );
}
