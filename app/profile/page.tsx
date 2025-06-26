import { LogOutBtn } from "@/components/features/LogOutBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "../../src/lib/auth";
import Error from "./error";

export default async function ProfilePage() {
  const session = await getAuthSession();

  if (!session) {
    return <Error />;
  }

  return (
    session && (
      <Card className="m-2 p-4">
        <CardHeader className="flex items-center justify-center gap-2 mt-5 px-15">
          <img
            width={60}
            height={60}
            className="rounded-full"
            src={session.user.image ?? "/default.jpg"}
            alt="profile picture"
          />
          <CardTitle className="flex flex-col gap-2">
            <div className="flex gap-2">
              <p>{session.user.email}</p>
            </div>
            <div className="flex gap-2">
              <span>{session.user.name}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <div className="w-full border-b borderwhite p-4"></div>
        <CardContent className="flex flex-col gap-4 w-2/3 mx-auto">
          <Button variant="outline" className="cursor-pointer">
            Admin
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Settings
          </Button>
          <LogOutBtn isInProfilePage={true} />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    )
  );
}
