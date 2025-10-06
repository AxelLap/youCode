// app/layout.
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import { TailwindIndicator } from "@/components/TalwindIndicator";
import { BackButton } from "@/components/features/navigation/BackButton";
import { Breadcrumbs } from "@/components/features/navigation/Breadcrumbs";
import { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import "@mdxeditor/editor/style.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren, ReactNode } from "react";
import { Providers } from "./Providers";
import "./globals.css";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout(
  props: PropsWithChildren<{ modal?: ReactNode }>
) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head />
        <body className={cn("h-full font-sans antialiased", fontSans.variable)}>
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <div className="flex justify-beetwin w-[90%] my-2 px-4">
                <Breadcrumbs />
                <BackButton />
              </div>
              <div className="flex-1">
                {props.children}
                {props.modal}
              </div>
              <Footer />
            </div>
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  );
}
