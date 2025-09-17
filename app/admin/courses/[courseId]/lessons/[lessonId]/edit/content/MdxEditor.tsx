"use client";

import dynamic from "next/dynamic";

import { Badge } from "@/components/ui/badge";
import { useDebounceFn } from "@/hooks/useDebounceFn";
import { useState } from "react";
import { toast } from "sonner";
import { contentActionUpdate } from "../../../lesson.action";

const InitializedMDXEditor = dynamic(() => import("./InitializedMDXEditor"), {
  ssr: false, // 🚀 empêche le rendu côté serveur
});

type MdxEditorProps = {
  markdown: string;
  lessonId: string;
};

type BadgeVariant =
  | "destructive"
  | "default"
  | "secondary"
  | "outline"
  | null
  | undefined;
type SyncState = "sync" | "syncing" | "not-sync";
const getBadgeColor = (
  syncState: SyncState
): { variant: BadgeVariant; message: string | null } => {
  if (syncState === "not-sync") {
    return { variant: "destructive", message: null };
  }
  if (syncState === "syncing") {
    return { variant: "default", message: "saving..." };
  }
  return { variant: "secondary", message: "Saved !" };
};
export const MdxEditor = ({ lessonId, markdown }: MdxEditorProps) => {
  const [syncState, setSyncState] = useState<SyncState>("sync");
  const onChange = useDebounceFn(async (value: string) => {
    setSyncState("syncing");
    const { serverError } = await contentActionUpdate({
      lessonId: lessonId,
      content: value,
    });

    if (serverError) {
      toast.error(serverError);
      setSyncState("not-sync");
      return;
    }

    setSyncState("sync");
  });
  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-3 right-2 z-4">
        <Badge variant={getBadgeColor(syncState).variant}>
          {getBadgeColor(syncState).message}
        </Badge>
      </div>
      <InitializedMDXEditor
        onChange={(v) => {
          setSyncState("not-sync");
          onChange(v);
        }}
        markdown={markdown}
      />
    </div>
  );
};
