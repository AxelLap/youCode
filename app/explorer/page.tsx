import { CourseCard } from "@/components/features/CourseCard";
import { PaginationBtn } from "@/components/features/PaginationButn";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";

import { prisma } from "@/lib/prisma";
export default async function ExplorerPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 0);

  const courses = await prisma.course.findMany({
    take: 9,
    skip: Math.max(0, page * 9),
    select: {
      id: true,
      name: true,
      image: true,
      creator: true,
    },
  });

  const entries = await prisma.course.count();

  if (courses) {
    console.log(courses);
  }

  return (
    <Layout className="max-w-[80%] ">
      <PageHeader pageName="Explorer" />
      <div className="w-full gap-4 h-fit flex flex-wrap p-4 shrink-0">
        {courses &&
          courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.name}
              image={course.image}
              creator={course.creator.name}
              creatorImage={course.creator.image}
            />
          ))}
      </div>

      <PaginationBtn
        baseUrl="/explorer"
        entriesPerPAge={9}
        totalEntries={entries}
        page={page}
      />
    </Layout>
  );
}
