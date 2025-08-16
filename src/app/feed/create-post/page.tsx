import CreatePostForm from "@/components/Feed/CreatePostForm";
import MainLayout from "@/components/MainLayout";

const page = () => {
  return (
    <>
      <MainLayout>
        <div className="grid place-items-center p-4">
          <CreatePostForm />
        </div>
      </MainLayout>
    </>
  );
};

export default page;
