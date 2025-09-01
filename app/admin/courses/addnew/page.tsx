import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Typography } from "@/components/ui/Typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { CourseForm } from "../[courseId]/edit/CourseForm";
import Error from "../error";

export default async function AddNewPage() {
  const session = await getRequiredAuthSession();

  if (!session) {
    return <Error />;
  }

  return (
    <Layout>
      <PageHeader pageName="New Course" />
      <LayoutContent>
        <Typography variant={"h3"} as={"h3"}>
          Add new course
        </Typography>
        <CourseForm />
      </LayoutContent>
    </Layout>
  );
}
