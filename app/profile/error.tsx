"use client"; // Error boundaries must be Client Components

import { LoginBtn } from "@/components/features/login/LoginBtn";
import { signIn } from "next-auth/react";

export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center m-2 p-4 gap-4">
      <h2>Ooooops ! Seems that you've been deconected!</h2>
      <p>Please try to log again :</p>
      <LoginBtn
        onClick={() => {
          signIn();
        }}
      />
    </div>
  );
}
