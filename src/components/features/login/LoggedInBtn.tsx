"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "../../../lib/utils";
import { UserAvatar } from "../images/UserAvatar";

type LoggedInBtnProps = {
  userSession: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    id?: string;
  };
};

export const LoggedInBtn = ({ userSession }: LoggedInBtnProps) => {
  return (
    <div
      className={cn(
        buttonVariants({ variant: "outline" }),
        "flex gap-2 items-center cursor-pointer"
      )}
    >
      <UserAvatar imageUrl={userSession.image} />

      <span className="hidden md:block">
        {userSession.name ?? "Utilisateur"}
      </span>
    </div>
  );
};
