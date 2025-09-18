"use client";

import { UserAvatar } from "@/components/features/images/UserAvatar";

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
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { removeUser } from "../course.action";

type UserRowProps = {
  courseUser: {
    id: string;
    name: string | null;
    image: string | null;
  };
  courseId: string;
};

export const UserRow = ({ courseUser, courseId }: UserRowProps) => {
  const router = useRouter();
  return (
    <TableRow>
      {/* Dialog wrapper */}
      <AlertDialog>
        <TableCell>
          <UserAvatar imageUrl={courseUser.image} />
        </TableCell>
        <TableCell>{courseUser.name}</TableCell>
        <TableCell>Active</TableCell>
        <TableCell className="text-right">
          {/*dialog activator */}
          <AlertDialogTrigger>
            <div
              className={cn(
                buttonVariants({ variant: "destructive" }),
                "cursor-pointer"
              )}
            >
              <Trash />
            </div>
          </AlertDialogTrigger>
        </TableCell>

        {/* dialog content */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to remove this user from the course ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-400 border border-red-400 text-white cursor-pointer hover:bg-white hover:text-red-400"
              onClick={async () => {
                const { data, serverError } = await removeUser({
                  courseId: courseId,
                  userId: courseUser.id,
                });

                if (data) {
                  router.refresh();
                  toast(`${data}`);
                }

                if (serverError) {
                  toast(`An error occured : ${serverError}`);
                }
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TableRow>
  );
};
