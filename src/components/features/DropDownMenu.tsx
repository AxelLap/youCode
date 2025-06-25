"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn } from "lucide-react";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { signIn, useSession } from "next-auth/react";

import { LoginBtn } from "../features/LoginBtn";
import { LoggedInBtn } from "./LoggedInBtn";

export const DropDownMenu = () => {
  const { data: session } = useSession();

  if (session) {
    console.log(session.user);

    return <LoggedInBtn userSession={session.user} />;
  } else {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-2 m-2 justify-between items-center cursor-pointer">
          <LogIn />
          <span>Login</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="w-fit m-auto">
            Connection
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LoginBtn
              onClick={() => {
                signIn();
              }}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};
