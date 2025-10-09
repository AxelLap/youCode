import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";

type LessonContentProps = {
  name: string | undefined;
  content: string | undefined;
};

export const LessonContent = ({ name, content }: LessonContentProps) => {
  return (
    <Card className="w-full mx-auto flex flex-col gap-2 ">
      <CardHeader>
        <CardTitle>
          <Typography variant={"h3"} as={"h2"} className="text-center">
            {name}
          </Typography>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Typography as={"p"}>{content}</Typography>
      </CardContent>
    </Card>
  );
};
