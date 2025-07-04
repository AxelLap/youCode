"use client";
import { Button } from "../../ui/button";

import { useRouter } from "next/navigation";

type PaginationBtnProps = {
  totalEntries: number;
  entriesPerPAge: number;
  page: number;
  baseUrl: string;
};

export const PaginationBtn = ({
  totalEntries,
  page,
  baseUrl,
  entriesPerPAge,
}: PaginationBtnProps) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center p-2 gap-2 w-[300px] m-auto relative">
      {page > 0 && (
        <Button
          onClick={() => {
            const searchParams = new URLSearchParams({
              page: String(page - 1),
            });
            router.push(`${baseUrl}?${searchParams}`);
          }}
          className="cursor-pointer absolute left-0 w-1/4 "
          variant="outline"
        >
          Previous
        </Button>
      )}
      <span className="w-1/4 text-center">
        {page + 1} / {Math.ceil(totalEntries / entriesPerPAge)}
      </span>
      {page + 1 < Math.ceil(totalEntries / entriesPerPAge) && (
        <Button
          onClick={() => {
            const searchParams = new URLSearchParams({
              page: String(page + 1),
            });
            router.push(`${baseUrl}?${searchParams}`);
          }}
          className="cursor-pointer absolute right-0 w-1/4"
          variant="outline"
        >
          Next
        </Button>
      )}
    </div>
  );
};
