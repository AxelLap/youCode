import { Layout, LayoutContent } from "@/components/layout/Layout";
import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonListFallback } from "../LessonListFallback";

export default async function LessonPage() {
  return (
    <Layout className="min-h-[60vh] max-w-[90%]">
      <LayoutContent className="flex flex-row gap-2">
        <Card className="min-w-3/4 flex flex-col gap-2">
          <CardHeader>
            <CardTitle>
              <Typography variant={"h3"} as={"h2"} className="text-center">
                Loading...
              </Typography>
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <LessonListFallback />
      </LayoutContent>
    </Layout>
  );
}
