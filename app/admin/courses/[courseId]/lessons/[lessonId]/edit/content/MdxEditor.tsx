"use client";

import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const InitializedMDXEditor = dynamic(() => import("./InitializedMDXEditor"), {
  ssr: false, // 🚀 empêche le rendu côté serveur
});

type MdxEditorProps = {
  markdown: string;
};
export const MdxEditor = (props: MdxEditorProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      {isHydrated ? (
        <InitializedMDXEditor markdown={props.markdown}></InitializedMDXEditor>
      ) : (
        <div className="w-fit h-fit m-auto flex flex-col gap-2">
          <Loader className="animate-spin m-auto" />
          <span>Chargement...</span>
        </div>
      )}
    </>
  );
};
