import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ShineBorder } from "./magicui/shine-border";
import { Button } from "./ui/button";

const Main = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <section className="h-screen w-screen px-4 py-3 md:flex">
        <div className="relative hidden md:block md:w-1/2">
          <Image
            src="/socialBg.png"
            alt="Hero visual"
            fill
            className="rounded-tl-4xl rounded-br-4xl object-cover"
            priority
          />
        </div>

        <div className="w-full px-4 md:w-1/2">
          <div className="flex justify-end">
            <Link
              //  href={"/auth/login"}
              href={session?.session ? "/feed" : "/auth/login"}
            >
              <Button className="">Login</Button>
            </Link>
          </div>
          <div className="py-40">
            <h1 className="mb-6 text-4xl leading-tight font-bold">
              Welcome to Your Next Adventure
            </h1>
            <p className="mb-8 text-gray-600">
              Join us and explore new horizons. Create an account to get
              started—it&apos;s free!
            </p>
            <div className="relative w-fit overflow-hidden rounded-full p-3">
              <ShineBorder
                shineColor={["#ffff00", "#87ceeb", "#ffc0cb", "#ff99cc"]}
                borderWidth={1}
                duration={5}
              />
              <Link href={"/auth/register"} className="text-chart-4 p-7">
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
