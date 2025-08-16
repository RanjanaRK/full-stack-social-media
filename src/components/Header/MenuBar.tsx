"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

const MenuBar = () => {
  const pathname = usePathname();
  const hide =
    pathname === "/auth/login" ||
    pathname === "/auth/register" ||
    pathname === "/auth/forgot-password" ||
    pathname === "/auth/forgot-password/reset-password" ||
    pathname === "/auth/good-bye" ||
    pathname === "/";

  if (hide) {
    return null;
  } else {
    return <Sidebar />;
  }
};

export default MenuBar;
