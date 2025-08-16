import SignIn from "@/components/Auth/SignIn";
import AuthLayout from "@/components/AuthLayout";

const page = () => {
  return (
    <>
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    </>
  );
};

export default page;
