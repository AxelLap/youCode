import { UserAvatar } from "@/components/features/images/UserAvatar";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ImageCourse } from "./ImageCourse";

type CourseCardProps = {
  id: string;
  image?: string;
  title: string;
  creator: string | null;
  creatorImage: string | null;
};

export const CourseCard = ({
  image,
  title,
  creator,
  creatorImage,
  id,
}: CourseCardProps) => {
  return (
    <Link href={`/explorer/courses/${id}`}>
      <Card className="h-[130px] flex flex-row items-center gap-3 w-xs p-0 ltr transition delay-50 duration-300 ease-in-out hover:bg-accent cursor-pointer hover:-translate-y-1 hover:scale-110">
        <ImageCourse url={image} />
        <div className="w-[50%] flex flex-col gap-2 p-1 justify-center text-center h-full">
          <Typography as="span" variant="h3" className="mt-2">
            {title}
          </Typography>
          <div className="flex gap-2 justify-center items-center mt-auto mr-auto mb-1">
            <UserAvatar imageUrl={creatorImage} />
            <span>{creator}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
