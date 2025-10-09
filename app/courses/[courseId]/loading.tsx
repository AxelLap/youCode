import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import { LessonListPlaceholder } from "../../../src/components/features/loading/LessonListPlaceholder";

export default async function CoursePage() {
  return (
    <Layout className="max-w-[80%]">
      <LayoutContent className="flex flex-row gap-[2%] justify-center ">
        <div className="flex flex-col w-[59%] h-[60vh] gap-4 ">
          <Card className="w-full h-[40%] overflow-hidden flex flex-row gap-0 ltr p-0 items-center">
            <div className="flex w-100 h-50 justify-center items-center">
              <Loader size={40} className="animate-spin" />
            </div>
            <div className="w-[60%] mx-auto flex flex-col items-center gap-4 py-3">
              <span className="text-center">Loading...</span>
            </div>
          </Card>
          <Card className="h-[60%]">
            <CardContent>
              <Skeleton className="w-[95%] h-[95%] mx-auto "></Skeleton>
            </CardContent>
          </Card>
        </div>
        <div className="w-[39%]">
          <LessonListPlaceholder />
        </div>
      </LayoutContent>
    </Layout>
  );
}
