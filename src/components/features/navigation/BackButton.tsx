"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.back();
      }}
      size="lg"
      variant="outline"
    >
      Back
    </Button>
  );
};
