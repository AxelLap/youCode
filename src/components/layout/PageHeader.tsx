import { ReactNode } from "react";
import { UserAvatar } from "../features/images/UserAvatar";
import { LayoutHeader, LayoutTitle } from "./Layout";

type PageHeaderProps = {
  imageUrl?: string | undefined;
  userName?: string | undefined;
  pageName: string | undefined;
  children?: ReactNode;
};

export const PageHeader = ({
  imageUrl,
  userName,
  pageName,
  children,
}: PageHeaderProps) => {
  if (imageUrl && userName) {
    return (
      <LayoutHeader>
        <UserAvatar imageUrl={imageUrl} />
        <LayoutTitle>{`${userName}'s ${pageName}`}</LayoutTitle>
        {children}
      </LayoutHeader>
    );
  } else {
    return (
      <LayoutHeader>
        {imageUrl && <UserAvatar imageUrl={imageUrl} />}
        <LayoutTitle>
          {`${pageName}`} {children}
        </LayoutTitle>
      </LayoutHeader>
    );
  }
};
