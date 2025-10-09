import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { LessonLinkPlaceholder } from "./LessonLinkPlaceholder";

export const LessonListPlaceholder = () => {
  return (
    <Card className="w-full h-[60vh] flex flex-col gap-4 p-3 overflow-scroll">
      <CardHeader>
        <Typography as={"h3"} variant={"h3"}>
          Loading :
        </Typography>
      </CardHeader>
  <CardContent className="p-0 flex flex-col gap-4 items-center mx-auto w-[90%]">
        {Array.from({ length: 5 }).map((r, i) => (
          <LessonLinkPlaceholder key={i} />
        ))}
      </CardContent>
    </Card>
  );
};
