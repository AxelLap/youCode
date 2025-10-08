import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader } from "lucide-react";
import { LessonListFallback } from "./LessonListFallback";

export default async function CoursePage() {
  return (
    <Layout>
      <LayoutContent className="flex flex-row gap-[2%] justify-center">
        <div className="flex flex-col w-[55%] h-full gap-4">
          <Card className="w-full h-[40%] overflow-hidden flex flex-row gap-0 ltr p-0 items-center">
            <div className="flex w-100 h-50 justify-center items-center">
              <Loader size={40} className="animate-spin" />
            </div>
            <div className="w-[60%] mx-auto flex flex-col items-center gap-4 py-3">
              <span className="text-center">Loading...</span>
            </div>
          </Card>
          <Card>
            <CardContent>
              <Skeleton className="w-full h-28 bg-accent"></Skeleton>
            </CardContent>
          </Card>
        </div>
        <LessonListFallback />
      </LayoutContent>
    </Layout>
  );
}
