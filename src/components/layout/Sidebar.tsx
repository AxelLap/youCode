import { cn } from "@/lib/utils";
import { ReactNode } from "react";
type SideBarProps = {
  isOpen: boolean;
  children: ReactNode;
};

export const Sidebar = ({ isOpen, children }: SideBarProps) => {
  return (
    <aside
      className={cn(
        isOpen ? "w-[24%] h-[60vh]" : "w-0 h-0 p-0 bg-transparent border-0",
        " flex justify-center items-center transition-all delay-150 duration-300 ease-in-out overflow-hidden p-1 mt-35"
      )}
    >
      {children}
    </aside>
  );
};
