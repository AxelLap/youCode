import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Typography } from "@/components/ui/Typography";
import { Loader } from "lucide-react";

export const CourseCardPlaceholder = () => {
  return (
    <Card className="max-h-[130px] max-w-80 h-full w-full flex flex-row items-center gap-3 p-0 ltr">
      <div className="min-w-[50%] h-50 rounded-l-md flex justify-center items-center">
        <Loader className="animate-spin m-auto" />
      </div>
      <div className="max-w-[50%] w-full flex flex-col gap-2 p-1 justify-center text-center h-full">
        <Typography as="span" variant="h3" className="mt-2">
          Loading...
        </Typography>
        <div className="flex gap-2 justify-center items-center mt-auto mr-auto mb-1">
          <div className="w-[30px] h-[30px] rouded-full">
            <Loader className="animate-spin " />
          </div>
          <Skeleton className="h-4 w-14"></Skeleton>
        </div>
      </div>
    </Card>
  );
};
