"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "../ui/button";

const GoodBye = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <>
        <div className="grid h-screen w-screen place-items-center">
          <div className="">
            <h1 className="py-2 text-center text-6xl font-semibold">
              Good Bye
            </h1>
            <p className="">
              Your account has been deleted. Thank you for being part of our
              journey.
            </p>
          </div>
          <Button onClick={() => router.replace("/")}>Back to Home</Button>
        </div>
      </>
    </>
  );
};

export default GoodBye;
