import ForgotPassword from "@/components/Auth/ForgotPassword";
import AuthLayout from "@/components/AuthLayout";

const page = () => {
  return (
    <>
      <AuthLayout>
        <ForgotPassword />
      </AuthLayout>
    </>
  );
};

export default page;
