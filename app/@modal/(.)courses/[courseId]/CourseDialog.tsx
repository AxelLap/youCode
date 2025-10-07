"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export type CourseDialogProps = PropsWithChildren;

export const CourseDialog = (props: CourseDialogProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isCoursePage = pathname?.split("/").filter(Boolean).length === 2;

  return (
    <Dialog
      open={isCoursePage}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogHeader>
        <DialogTitle>Suck my clit</DialogTitle>
      </DialogHeader>
      <DialogContent className="max-h-screen w-fit overflow-auto">
        {props.children}
        {pathname && (
          <Button
            className="w-2/3 mx-auto my-2"
            onClick={() => {
              window.location.reload();
            }}
            variant="secondary"
          >
            Reach course
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
