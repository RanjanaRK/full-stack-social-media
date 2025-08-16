import SignUp from "@/components/Auth/SignUp";
import AuthLayout from "@/components/AuthLayout";

const page = () => {
  return (
    <>
      <AuthLayout>
        <SignUp />
      </AuthLayout>
    </>
  );
};

export default page;
