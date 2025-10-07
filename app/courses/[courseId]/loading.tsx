import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";

export default async function CoursePage() {
  return (
    <Layout className="min-h-[60vh] max-w-[90%]">
      <LayoutContent className="flex flex-row gap-[2%]">
        <div className="flex flex-col w-[55%] h-full gap-4">
          <Card className="w-full h-40 flex flex-row gap-0 ltr p-0 items-center">
            <div className="flex w-40 h-full justify-center items-center">
              <Loader className="animate-spin" />
            </div>
            <div className="w-[40%] mx-auto flex flex-col items-center gap-4 py-3">
              <Typography variant={"h3"} as={"h2"} className="text-center">
                Loading...
              </Typography>
              <Skeleton className="flex gap-2 items-center bg-accent w-full h-7"></Skeleton>
            </div>
          </Card>
          <Card>
            <CardContent>
              <Skeleton className="w-full h-28 bg-accent"></Skeleton>
            </CardContent>
          </Card>
        </div>
        <Card className=" w-[45%] flex flex-col gap-4 p-3">
          <CardHeader>
            <Typography as={"h3"} variant={"h3"}>
              Loading... :
            </Typography>
          </CardHeader>

          <CardContent className="p-0 flex flex-col gap-2 items-center justify-center">
            {Array.from({ length: 5 }).map((r, index) => (
              <div className="flex gap-2" key={index}>
                <Skeleton className="w-6 h-10" />
                <Skeleton className="w-3xs h-10" />
              </div>
            ))}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
