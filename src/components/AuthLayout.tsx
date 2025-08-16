import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid h-screen w-screen place-items-center">{children}</div>
  );
};

export default AuthLayout;
