"use client";
import { cn } from "@/lib/utils";
import { Sidebar as SidebarLogo } from "lucide-react";
import { PropsWithChildren, ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { Sidebar } from "./Sidebar";

type SideBarWrapperProps = {
  sidebarContent: ReactNode;
};

export const SideBarWrapper = ({
  sidebarContent,
  children,
}: PropsWithChildren<SideBarWrapperProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative h-full w-full m-2 p-2 flex flex-col gap-2">
      <div className="w-full h-fit flex items-start gap-2">
        <Sidebar isOpen={isOpen}>{sidebarContent}</Sidebar>
        <div
          className={cn(
            isOpen ? "w-[73%]" : "w-[90%] ",
            "relative transition-all delay-150 duration-300 ease-in-out mx-auto h-fit"
          )}
        >
          <Button
            variant={isOpen ? "outline" : "ghost"}
            className="absolute top-6 left-6 h-5 w-5"
            onClick={() => setIsOpen((state) => !state)}
          >
            <SidebarLogo className="w-full h-full" />
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
};
