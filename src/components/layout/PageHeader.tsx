import { UserAvatar } from "../features/images/UserAvatar";
import { LayoutHeader, LayoutTitle } from "./Layout";

type PageHeaderProps = {
  imageUrl?: string | undefined;
  userName?: string | undefined;
  pageName: string | undefined;
};

export const PageHeader = ({
  imageUrl,
  userName,
  pageName,
}: PageHeaderProps) => {
  if (imageUrl && userName) {
    return (
      <LayoutHeader>
        <UserAvatar imageUrl={imageUrl} />
        <LayoutTitle>{`${userName}'s ${pageName}`}</LayoutTitle>
      </LayoutHeader>
    );
  } else {
    return (
      <LayoutHeader>
        {imageUrl && <UserAvatar imageUrl={imageUrl} />}
        <LayoutTitle>{`${pageName}`}</LayoutTitle>
      </LayoutHeader>
    );
  }
};
