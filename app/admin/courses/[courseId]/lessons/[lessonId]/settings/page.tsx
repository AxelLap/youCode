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
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const LessonSettingsValidator = z.object({
  name: z.string().min(4).max(40),
  state: z.enum(["HIDDEN", "PUBLISHED", "PUBLIC"]),
});

export default async function LessonSettingsPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.lessonId,
    },
    include: {
      course: true,
    },
  });

  return (
    <Layout>
      <PageHeader pageName={`${lesson?.name}'s settings`} />
      <LayoutContent>
        <form
          action={async (formData: FormData) => {
            "use server";

            const name = formData.get("name");

            const state = formData.get("state");

            const validatedData = LessonSettingsValidator.safeParse({
              name,
              state,
            });

            if (validatedData.success) {
              await prisma.lesson.update({
                where: {
                  id: params.lessonId,
                },
                data: validatedData.data,
              });
              revalidatePath(
                `/admin/courses/${lesson?.course.id}/lessons/${lesson?.id}/settings`
              );
            }
          }}
          className="w-full flex flex-col gap-6 p-4 m-2"
        >
          <div className="flex mb-4 w-full flex-col gap-2 p-1">
            <label htmlFor="name">Name</label>
            <Input name="name" defaultValue={lesson?.name} type="text" />
          </div>
          <div className="flex mb-4 w-full items-center flex-col gap-2 p-1 cursor-pointer">
            <label htmlFor="state">State</label>

            <Select name="state" defaultValue={lesson?.state}>
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
