"use client";
import { cn } from "@/lib/utils";
import { Sidebar as SidebarLogo } from "lucide-react";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Fonction qui met à jour l’état
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // 768px = breakpoint md
    };

    handleResize(); // Appel initial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-full w-full flex flex-col gap-2 ">
      <div className="w-full h-fit flex items-start gap-0 ">
        {isDesktop && <Sidebar isOpen={isOpen}>{sidebarContent}</Sidebar>}
        <div
          className={cn(
            isOpen ? "md:w-[73%]" : "w-full md:w-[90%] ",
            "relative transition-all delay-150 duration-300 ease-in-out mx-auto h-fit "
          )}
        >
          {isDesktop && (
            <Button
              variant={isOpen ? "outline" : "ghost"}
              className="absolute top-6 left-6 h-8 w-8 p-2"
              onClick={() => setIsOpen((state) => !state)}
            >
              <SidebarLogo className="w-full h-full" />
            </Button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
