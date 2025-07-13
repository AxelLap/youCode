// src/components/layout/Header.

import { SiteConfig } from "@/lib/site-config";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";

import { DropDownMenu } from "../features/navigation/DropDownMenu";
import { Typography } from "../ui/Typography";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b px-4">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6">
          <Typography variant="h3" as={Link} href="/">
            {SiteConfig.title}
          </Typography>
          <img
            height={30}
            width={30}
            className="my-auto"
            src="/logo.svg"
            alt="Youcode Logo"
          />
          <Typography as={Link} href="/explorer">
            Explorer
          </Typography>
          <Typography as={Link} href="/explorer/courses">
            My courses
          </Typography>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <DropDownMenu />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
