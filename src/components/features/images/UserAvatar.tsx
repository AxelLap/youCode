import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

type UserAvatarProps = {
  imageUrl?: string | null;
};

export const UserAvatar = ({ imageUrl }: UserAvatarProps) => {
  return (
    <Avatar className="w-[30px] h-[30px] rouded-full">
      {imageUrl && <AvatarImage src={imageUrl} />}
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  );
};
