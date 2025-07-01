import { UserAvatar } from "../features/UserAvatar";
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
        <LayoutTitle>{`${pageName}`}</LayoutTitle>
      </LayoutHeader>
    );
  }
};
