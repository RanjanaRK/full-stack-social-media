"use client";

import { Home, Plus, Settings2, User2 } from "lucide-react";
import Link from "next/link";
import Logout from "../Auth/Logout";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
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
  return (
    <>
      <Sidebar>
        <SidebarGroupContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-secondary text-xl font-bold">
              EchoSpace
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild size={"lg"}>
                      <Link href={item.url} className="flex gap-2">
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem className="">
                  {/* <SidebarMenuButton size={"lg"}> */}
                  <SearchBar />
                  {/* </SidebarMenuButton> */}
                </SidebarMenuItem>

                <SidebarMenuItem>
                  {/* <SidebarMenuButton size={"lg"}> */}
                  <ThemeToggle />
                  {/* </SidebarMenuButton> */}
                </SidebarMenuItem>

                <SidebarMenuItem>
                  {/* <SidebarMenuButton size={"lg"}> */}
                  <Logout />
                  {/* </SidebarMenuButton> */}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarGroupContent>
      </Sidebar>
    </>
  );
};

export default Navbar;
