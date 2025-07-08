import { Layout, LayoutContent } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import Error from "../profile/error";

const FormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
});

export default async function SettingsPage() {
  const session = await getRequiredAuthSession();

  if (!session) {
    return <Error />;
  }

  return (
    <Layout>
      <PageHeader
        pageName="Account Settings"
        imageUrl={session.user.image}
        userName={session.user.name}
      />
      <LayoutContent>
        <form
          className="flex flex-col gap-4 p-4 w-3/4 mx-auto "
          action={async (formData: FormData) => {
            "use server";

            const image = formData.get("image");
            const name = formData.get("name");

            const safeData = FormSchema.safeParse({
              image,
              name,
            });

            if (safeData.error) {
              redirect("/");
            }

            await prisma.user.update({
              where: {
                id: session.user.id,
              },
              data: safeData.data,
            });

            revalidatePath("/settings");
          }}
        >
          <div className="flex w-full flex-col gap-4 p-2">
            <Label>Image</Label>
            <Input name="image" type="text" defaultValue={session.user.image} />
          </div>
          <div className="flex w-full flex-col gap-4 p-2">
            <Label>Name</Label>
            <Input name="name" type="text" defaultValue={session.user.name} />
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
