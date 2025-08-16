import ResetPassword from "@/components/Auth/ResetPassword";
import AuthLayout from "@/components/AuthLayout";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <AuthLayout>
        <Suspense fallback={<div>Loading reset form…</div>}>
          <ResetPassword />
        </Suspense>
      </AuthLayout>
    </>
  );
};

export default page;
