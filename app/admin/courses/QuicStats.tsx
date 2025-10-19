import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLast30DaysStats } from "@/lib/getLastDaysStats";
import { prisma } from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { NewUsersChart } from "./NewUsersChart";

type QuicStatsProps = {
  userId: string;
};

export const QuicStats = async ({ userId }: QuicStatsProps) => {
  const courseCount = await prisma.course.count({
    where: {
      creatorId: userId,
    },
  });

  const lessonsCount = await prisma.lesson.count({
    where: {
      course: {
        creatorId: userId,
      },
    },
  });

  const courseOnUserData = await prisma.courseOnUser.findMany({
    where: {
      course: {
        creatorId: userId,
      },
    },
    distinct: ["userId"],
  });

  const chartData = getLast30DaysStats(courseOnUserData);

  console.log(chartData);

  return (
    <div className="h-full gap-4 flex flex-col">
      <div className="w-full m-2 p-2 flex gap-2">
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-20 flex flex-col w-[30%] gap-2 p-4"
          )}
        >
          <span>Courses :</span>
          <span>{courseCount}</span>
        </div>
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-20 flex flex-col w-[30%] gap-2 p-4"
          )}
        >
          <span>Lessons :</span>
          <span>{lessonsCount}</span>
        </div>
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-20 flex flex-col w-[30%] gap-2 p-4"
          )}
        >
          <span>Users :</span>
          <span>{courseOnUserData.length}</span>
        </div>
      </div>
      {chartData && (
        <Card className="bg-primary flex justify-center items-center p-2 mx-auto my-1 h-1/2 w-full">
          <NewUsersChart data={chartData} />
        </Card>
      )}
    </div>
  );
};
