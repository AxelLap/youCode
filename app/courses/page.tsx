import { CourseCard } from "@/components/features/courses/CourseCard";
import { CoursesWrapper } from "@/components/features/courses/CoursesWrapper";
import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CoursesPage() {
  const session = await getRequiredAuthSession();

  const courses = await prisma.course.findMany({
    where: {
      users: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      creator: true,
    },
  });

  return (
    <Layout className="max-w-[90%] ">
      <PageHeader pageName="My courses" />
      <LayoutContent>
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
      </LayoutContent>
    </Layout>
  );
}
