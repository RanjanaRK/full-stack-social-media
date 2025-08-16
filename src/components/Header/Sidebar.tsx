"use client";
import { cn } from "@/lib/utils"; // shadcn utility
import { Home, Plus, User2 } from "lucide-react"; // or use @radix-ui/icons
import Link from "next/link";
import Logout from "../Auth/Logout";
import { Button } from "../ui/button";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import UserAccountDelete from "./UserAccountDelete";

const items = [
  {
    title: "Home",
    url: "/feed",
    icon: <Home />,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: <User2 />,
  },
  {
    title: "Create Post",
    url: "/feed/create-post",
    icon: <Plus />,
  },
];

const Sidebar = () => {
  return (
    <>
      <div
        className={cn(
          "fixed hidden h-screen border-r transition-all duration-300 ease-in-out md:block",
          "w-16 md:w-20 lg:w-64",
        )}
      >
        <div className="p-4 text-xl font-bold">Echo</div>

        <nav className="flex flex-col items-center space-y-6 p-4 lg:items-start">
          {items.map((item) => (
            <Link href={item.url} key={item.title} className="w-full">
              <Button
                variant={"ghost"}
                className="hover:bg-primary/90 flex cursor-pointer items-center justify-start gap-4 rounded-md px-2 py-2 transition-colors duration-200 ease-in-out lg:w-full"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="hidden lg:inline">{item.title}</span>
              </Button>
            </Link>
          ))}
        </nav>

        <div className="space-y-6 p-4">
          <SearchBar />
          <UserAccountDelete />
          <ThemeToggle />
          <Logout />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
