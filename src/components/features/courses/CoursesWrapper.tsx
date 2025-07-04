import { ReactNode } from "react";

type CoursesWrapperProps = {
  children: ReactNode;
};
export const CoursesWrapper = ({ children }: CoursesWrapperProps) => {
  return (
    <div className="w-full gap-4 h-fit flex flex-wrap p-4 shrink-0 justify-center">
      {children}
    </div>
  );
};
