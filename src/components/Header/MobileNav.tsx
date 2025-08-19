// components/MobileNav.tsx
import { Home, Plus, Settings2, User2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import Logout from "../Auth/Logout";

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

  {
    title: "Settings",
    url: "#",
    icon: <Settings2 />,
  },
];

export default function MobileNav() {
  return (
    <>
      <header className="bg-background fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b px-4 py-2 shadow-sm md:hidden">
        <h1 className="text-xl font-bold">ConnectSphere</h1>

        <div className="flex items-center gap-2 md:hidden">
          <SearchBar />
          <ThemeToggle />
          <Logout />
        </div>
      </header>
      <nav className="bg-background fixed right-0 bottom-0 left-0 z-50 flex h-14 items-center justify-between border-t px-4 md:hidden">
        {items.map((item) => (
          <Link key={item.title} href={item.url} className="">
            <Button
              variant="ghost"
              className="hover:bg-primary/90 flex items-center gap-2 rounded-md p-2 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              {/* <span className="hidden lg:inline">{item.title}</span> */}
            </Button>
          </Link>
        ))}
      </nav>
    </>
  );
}
