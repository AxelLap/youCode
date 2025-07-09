import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CourseSettingsValidator = z.object({
  name: z.string().min(4).max(40),
  image: z.string().url(),
  presentation: z.string().min(10).max(200),
});

export default async function CourseSettingsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  return (
    <Layout>
      <PageHeader pageName={`${course?.name}'s settings`} />
      <LayoutContent>
        <form
          action={async (formData: FormData) => {
            "use server";

            const name = formData.get("name");
            const image = formData.get("image");
            const presentation = formData.get("presentation");

            const validatedData = CourseSettingsValidator.safeParse({
              name,
              image,
              presentation,
            });

            if (validatedData.success) {
              await prisma.course.update({
                where: {
                  id: params.courseId,
                },
                data: validatedData.data,
              });
            }

            revalidatePath(`/admin/courses/${params.courseId}/settings`);
          }}
          className="w-full flex flex-col gap-4 p-4 m-2"
        >
          <Typography variant={"h3"} as={"h3"}>
            {course?.name}
          </Typography>
          <div className="flex w-full flex-col gap-2 p-1">
            <label htmlFor="name">Name</label>
            <Input name="name" defaultValue={course?.name} type="text" />
          </div>
          <div className="flex w-full flex-col gap-2 p-1">
            <label htmlFor="image">Image</label>
            <Input name="image" defaultValue={course?.image} type="text" />
          </div>
          <div className="flex w-full flex-col gap-2 p-1">
            <label htmlFor="presentation">Presentation</label>
            <Input
              name="presentation"
              defaultValue={course?.presentation}
              type="text"
            />
          </div>
          <Button
            variant="outline"
            className="w-fit m-auto cursor-pointer"
            type="submit"
          >
            Validate
          </Button>
        </form>
      </LayoutContent>
    </Layout>
  );
}
