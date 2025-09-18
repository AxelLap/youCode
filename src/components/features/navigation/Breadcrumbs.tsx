"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Breadcrumbs = () => {
  const pathName = usePathname();

  const segments = pathName?.split("/").slice(1);

  return (
    <div className="flex w-[80%] item-center mx-auto mt-3">
      <Link className="text-blue-200 hover:underline" href="/">
        Home
      </Link>
      {segments &&
        segments.map((segment, i) => {
          const isLast = i === segments.length - 1;

          const path = "/" + segments.slice(0, i + 1).join("/");

          if (isLast) {
            return (
              <div key={i} className="flex item-center text-gray-400">
                <span className="mx-3">{">"}</span>
                <span>
                  {segment.length >= 17
                    ? segment.slice(0, 3) + "..." + segment.slice(-3)
                    : segment}
                </span>
              </div>
            );
          }
          return (
            <div key={i} className="flex item-center text-blue-200">
              <span className="mx-3">{">"}</span>
              <Link className=" hover:underline" href={path}>
                {segment.length >= 17
                  ? segment.slice(0, 3) + "..." + segment.slice(-3)
                  : segment}
              </Link>
            </div>
          );
        })}
    </div>
  );
};
