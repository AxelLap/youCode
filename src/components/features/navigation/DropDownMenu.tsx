"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn } from "lucide-react";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";

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

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../../ui/button";
import { LogOutBtn } from "../login/LogOutBtn";
import { LoggedInBtn } from "../login/LoggedInBtn";
import { LoginBtn } from "../login/LoginBtn";

export const DropDownMenu = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <DropdownMenu>
      <AlertDialog>
        <DropdownMenuTrigger className="flex gap-2 m-2 justify-between items-center cursor-pointer">
          {session ? (
            <LoggedInBtn userSession={session.user} />
          ) : (
            <div className="flex gap-2 p-1">
              <LogIn />
              <span>Login</span>
            </div>
          )}
        </DropdownMenuTrigger>

        {session ? (
          <DropdownMenuContent>
            <DropdownMenuItem>
              <AlertDialogTrigger
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full flex gap-2 items-center cursor-pointer my-2"
                )}
              >
                <LogOutBtn isInProfilePage={false} />
              </AlertDialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full flex gap-2 items-center cursor-pointer my-2"
                )}
                href="/admin/profile"
              >
                My profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent>
            <DropdownMenuItem>
              <LoginBtn
                onClick={() => {
                  signIn();
                }}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        )}

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
    </DropdownMenu>
  );
};
