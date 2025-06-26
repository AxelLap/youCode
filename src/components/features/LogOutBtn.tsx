"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

type LogOutBtnProps = {
  isInProfilePage: boolean;
};

export const LogOutBtn = ({ isInProfilePage }: LogOutBtnProps) => {
  return isInProfilePage ? (
    <Button
      variant="destructive"
      className="cursor-pointer"
      onClick={() => {
        signOut();
      }}
    >
      <LogOut />
      <span>Logout</span>
    </Button>
  ) : (
    <>
      <LogOut />
      <span>Logout</span>
    </>
  );
};
