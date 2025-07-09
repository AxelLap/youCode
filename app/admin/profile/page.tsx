import { LogOutBtn } from "@/components/features/login/LogOutBtn";
import { Layout, LayoutDescription } from "@/components/layout/Layout";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { getRequiredAuthSession } from "../../../src/lib/auth";
import { cn } from "../../../src/lib/utils";
import Error from "./error";

export default async function ProfilePage() {
  const session = await getRequiredAuthSession();

  if (!session) {
    return <Error />;
  }

  return (
    session && (
      <Layout>
        <PageHeader
          imageUrl={session?.user.image}
          userName={session?.user.name}
          pageName="Profile"
        />
        <Card className="w-lg m-auto mt-4">
          <CardHeader>
            <LayoutDescription className="text-center">
              Change your account's settings or access to your class board to
              manage your courses
            </LayoutDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 w-2/3 mx-auto">
            <Link
              href="/admin/courses"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "cursor-pointer"
              )}
            >
              Class Board
            </Link>
            <Link
              href="/admin/settings"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "cursor-pointer"
              )}
            >
              Settings
            </Link>
            <LogOutBtn isInProfilePage={true} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </Layout>
    )
  );
}
