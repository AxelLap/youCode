import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Loader } from "lucide-react";

export default async function LessonPage() {
  return (
    <Layout className="min-h-[60vh] max-w-[90%] w-full">
      <LayoutContent className="flex flex-col items-center gap-2">
        <Typography variant={"h3"} as={"h2"} className="text-center">
          Loading...
        </Typography>
        <Loader className="animate-spin my-2 mx-auto" />
      </LayoutContent>
    </Layout>
  );
}
