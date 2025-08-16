import { ReactNode } from "react";
import MenuBar from "./Header/MenuBar";
import MobileNav from "./Header/MobileNav";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full">
      <MenuBar />
      <main className="flex-1 p-4 md:ml-20 lg:ml-64">{children}</main>
      <MobileNav />
    </div>
  );
};

export default MainLayout;
