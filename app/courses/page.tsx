import { CourseCard } from "@/components/features/courses/CourseCard";
import { CoursesWrapper } from "@/components/features/courses/CoursesWrapper";
import { PaginationBtn } from "@/components/features/navigation/PaginationButn";
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
    where: {
      state: "PUBLISHED",
    },
    take: 9,
    skip: Math.max(0, page * 9),
    select: {
      id: true,
      name: true,
      image: true,
      creator: true,
    },
  });

  console.log(page);

  const entries = await prisma.course.count({
    where: {
      state: "PUBLISHED",
    },
  });

  return (
    <Layout className="max-w-[90%] ">
      <PageHeader pageName="Explorer" />
      <CoursesWrapper>
        {courses &&
          courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.name}
              image={course.image}
              creator={course.creator.name}
              creatorImage={course.creator.image}
            />
          ))}
      </CoursesWrapper>

      <PaginationBtn
        baseUrl="/courses"
        entriesPerPAge={9}
        totalEntries={entries}
        page={page}
      />
    </Layout>
  );
}
