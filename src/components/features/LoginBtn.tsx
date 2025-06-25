"use client";
import { GithubIcon } from "lucide-react";
import { Button } from "../ui/button";

type LoginBtnProps = {
  onClick: () => void;
};

export const LoginBtn = ({ onClick }: LoginBtnProps) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="flex gap-2 p-1 cursor-pointer"
    >
      <GithubIcon />
      <p>Connect with github</p>
    </Button>
  );
};
