import { NewCourseBtn } from "@/components/features/NewCourseBtn";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function adminPage() {
  const session = await getRequiredAuthSession();

  return (
    <Layout>
      <PageHeader
        imageUrl={session?.user.image}
        userName={session?.user.name}
        pageName="ClassBoard"
      />
      <Card className="w-lg m-auto mt-4">
        <CardHeader>
          <CardTitle>
            <h2>Admin actions</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 items-center justify-center">
          <Link
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-fit"
            )}
            href="/admin/courses"
          >
            My Courses
          </Link>
          <NewCourseBtn />
        </CardContent>
      </Card>
    </Layout>
  );
}
