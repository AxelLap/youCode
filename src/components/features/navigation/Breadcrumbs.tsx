"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Breadcrumbs = () => {
  const pathName = usePathname();
  console.log(pathName);
  const segments = pathName?.split("/").slice(1);
  console.log(segments);

  return (
    <div className="flex w-[80%] item-center mx-auto mt-3">
      <Link className="text-blue-200 hover:underline" href="/">
        Home
      </Link>
      {segments &&
        segments.map((segment, i) => {
          const isLast = i === segments.length - 1;

          const path = "/" + segments.slice(0, i + 1).join("/");
          console.log(path);
          if (isLast) {
            return (
              <div key={i} className="flex item-center text-gray-400">
                <span className="mx-3">{">"}</span>
                <span>{segment}</span>
              </div>
            );
          }
          return (
            <div key={i} className="flex item-center text-blue-200">
              <span className="mx-3">{">"}</span>
              <Link className=" hover:underline" href={path}>
                {segment}
              </Link>
            </div>
          );
        })}
    </div>
  );
};
