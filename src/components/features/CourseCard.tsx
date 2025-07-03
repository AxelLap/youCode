import { UserAvatar } from "@/components/features/UserAvatar";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

type CourseCardProps = {
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
}: CourseCardProps) => {
  return (
    <Card className="h-[100px] flex flex-row items-center gap-3 w-2xs p-0 pr-5 ltr">
      {image ? (
        <img
          src={image}
          alt="course illustration image"
          className="w-[80px] h-full p-0 m-0 rounded-s-lg object-cover"
        />
      ) : (
        <User />
      )}
      <div className="flex flex-col gap-2 p-1 ml-2 justify-between h-full">
        <Typography variant="h3">{title}</Typography>
        <div className="flex gap-1 items-center">
          <UserAvatar imageUrl={creatorImage} />
          <span>{creator}</span>
        </div>
      </div>
    </Card>
  );
};
