"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const Logout = () => {
  const { push } = useRouter();
  const [, setIsPending] = useState(false);

  const logoutHandle = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },

        onResponse: () => {
          setIsPending(true);
        },

        onError: (ctx) => {
          toast.error(ctx.error.message);
        },

        onSuccess: () => {
          toast("you logged out");
          push("/");
        },
      },
    });
  };

  return (
    <>
      <Button
        onClick={logoutHandle}
        variant={"ghost"}
        className="hover:bg-primary/90 flex cursor-pointer items-center justify-start gap-4 rounded-md px-2 py-2 transition-colors duration-200 ease-in-out lg:w-full"
      >
        <span className="text-xl">
          <LogOut size={16} />
        </span>
        <span className="hidden lg:inline">Logout</span>
      </Button>
    </>
  );
};

export default Logout;
