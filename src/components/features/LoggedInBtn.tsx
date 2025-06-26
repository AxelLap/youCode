"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "../../lib/utils";

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
      <img
        width={30}
        height={30}
        className="rounded-full"
        src={userSession.image ?? "/default.jpg"}
        alt="logged in profile picture"
      />
      <span>{userSession.name ?? "Utilisateur"}</span>
    </div>
  );
};
