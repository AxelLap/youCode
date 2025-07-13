import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addLesson } from "../admin-lesson.query";

const newLessonValidator = z.object({
  name: z.string().min(4).max(40),
  state: z.enum(["HIDDEN", "PUBLISHED", "PUBLIC"]),
  content: z.string().min(25).max(2000),
});

export default async function AddNewLessonPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  return (
    <Layout>
      <PageHeader pageName="Add new lesson" />
      <LayoutContent>
        <form
          action={async (formData: FormData) => {
            "use server";

            const name = formData.get("name");

            const state = formData.get("state");

            const content = formData.get("content");

            const validatedData = newLessonValidator.safeParse({
              name,
              state,
              content,
            });

            if (validatedData.success) {
              console.log(validatedData.data);

              const newLesson = await addLesson(
                params.courseId,
                validatedData.data
              );
              revalidatePath(
                `/admin/courses/${params.courseId}/lessons/${newLesson?.id}`
              );
            } else {
              console.log("error");
            }
          }}
          className="w-full flex flex-col gap-6 p-4 m-2"
        >
          <div className="flex mb-4 w-full flex-col gap-2 p-1">
            <label htmlFor="name">Name</label>
            <Input name="name" type="text" />
          </div>
          <div className="flex mb-4 w-full items-center flex-col gap-2 p-1 cursor-pointer">
            <label htmlFor="state">State</label>

            <Select name="state">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="- Choose a state -" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HIDDEN">Hidden</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="PUBLIC">Public</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex mb-4 w-full flex-col gap-2 p-1">
            <label htmlFor="name">Content</label>
            <Textarea
              name="content"
              placeholder="Type your lesson content here"
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
