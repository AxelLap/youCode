import { UserAvatar } from "@/components/features/images/UserAvatar";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { CourseImage } from "../images/CourseImage";

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
    <Link href={`/courses/${id}`}>
      <Card className="h-[130px] flex flex-row items-center gap-3 w-xs p-0 ltr hover:bg-accent cursor-pointer">
        <CourseImage image={image} />
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
