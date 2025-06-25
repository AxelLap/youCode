"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { signOut } from "next-auth/react";
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
    <AlertDialog>
      <AlertDialogTrigger
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
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>This action will log you out !</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to proceed ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-400 border border-red-400 text-white cursor-pointer hover:bg-white hover:text-red-400"
            onClick={() => {
              signOut();
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
