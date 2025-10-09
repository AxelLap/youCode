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
    <div className="absolute h-screen w-screen top-0 left-0 z-0">
      <Button
        variant={isOpen ? "outline" : "ghost"}
        className="absolute top-19 left-5"
        onClick={() => setIsOpen((state) => !state)}
      >
        <SidebarLogo />
      </Button>
      <div className="w-full h-full flex gap-2">
        <Sidebar isOpen={isOpen}>{sidebarContent}</Sidebar>
        <div
          className={cn(
            isOpen ? "w-[73%]" : "w-[90%] ",
            "transition-all delay-150 duration-300 ease-in-out mt-35 mx-auto"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
