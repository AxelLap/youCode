import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRequiredAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { addCourse } from "../admin-course.query";
import Error from "../error";

const CourseValidator = z.object({
  name: z.string().min(4).max(40),
  image: z.string().url(),
  presentation: z.string().min(10).max(200),
});

export default async function AddNewPage() {
  const session = await getRequiredAuthSession();

  if (!session) {
    return <Error />;
  }

  return (
    <Layout>
      <PageHeader pageName="New Course" />
      <LayoutContent>
        <form
          className="flex flex-col gap-4 p-4 w-3/4 mx-auto "
          action={async (formData: FormData) => {
            "use server";

            const session = await getRequiredAuthSession();

            const user = session.user;

            const image = formData.get("image");
            const name = formData.get("name");
            const presentation = formData.get("presentation");

            const validatedData = CourseValidator.safeParse({
              image,
              name,
              presentation,
            });

            if (validatedData.error) {
              redirect("/");
            }

            const newCourse = await addCourse(validatedData.data, user);

            revalidatePath("/admin/courses");
            redirect(`/admin/courses/${newCourse.id}`);
          }}
        >
          <div className="flex w-full flex-col gap-4 p-2">
            <Label>Name</Label>
            <Input name="name" type="text" required />
          </div>
          <div className="flex w-full flex-col gap-4 p-2">
            <Label>Presentation</Label>
            <Input name="presentation" type="text" required />
          </div>
          <div className="flex w-full flex-col gap-4 p-2">
            <Label>Image</Label>
            <Input name="image" type="text" required />
          </div>
          <Button
            type="submit"
            variant="outline"
            className="w-1/2 mx-auto my-6 cursor-pointer"
          >
            Validate
          </Button>
        </form>
      </LayoutContent>
    </Layout>
  );
}
