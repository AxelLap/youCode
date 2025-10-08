import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { LessonLinkFallback } from "./LessonLinkFallback";

export const LessonListFallback = () => {
  return (
    <Card className=" w-[45%] max-h-[60vh] flex flex-col gap-4 p-3 overflow-scroll">
      <CardHeader>
        <Typography as={"h3"} variant={"h3"}>
          Loading :
        </Typography>
      </CardHeader>
      <CardContent className="p-0 flex flex-col gap-2 items-center mx-auto w-full">
        {Array.from({ length: 5 }).map((r, i) => (
          <LessonLinkFallback key={i} />
        ))}
      </CardContent>
    </Card>
  );
};
