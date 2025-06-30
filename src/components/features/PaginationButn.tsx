"use client";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

type PaginationBtnProps = {
  totalUsers: number;
  page: number;
  baseUrl: string;
};

export const PaginationBtn = ({
  totalUsers,
  page,
  baseUrl,
}: PaginationBtnProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center p-2 gap-2 w-full relative">
      {page > 0 && (
        <Button
          onClick={() => {
            const searchParams = new URLSearchParams({
              page: String(page - 1),
            });
            router.push(`${baseUrl}?${searchParams}`);
          }}
          className="cursor-pointer absolute left-[25%]"
          variant="ghost"
        >
          <MinusCircle />
        </Button>
      )}
      <span>
        {page + 1} / {Math.ceil(totalUsers / 5)}
      </span>
      {page + 1 < Math.ceil(totalUsers / 5) && (
        <Button
          onClick={() => {
            const searchParams = new URLSearchParams({
              page: String(page + 1),
            });
            router.push(`${baseUrl}?${searchParams}`);
          }}
          className="cursor-pointer absolute right-[25%]"
          variant="ghost"
        >
          <PlusCircle />
        </Button>
      )}
    </div>
  );
};
