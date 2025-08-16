import getPostById from "@/actions/feed/getPostById";
import FeedCard from "@/components/Feed/FeedCard";
import MainLayout from "@/components/MainLayout";

const page = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = await params;
  console.log(postId);

  const { data } = await getPostById({ postId: postId });

  if (!data) {
    return <div className="">No posts </div>;
  }

  return (
    <>
      <MainLayout>
        <div className="flex justify-center">
          <FeedCard
            posts={data}
            showCommentDetail={true}
            showCommentForm={true}
          />
        </div>
      </MainLayout>
    </>
  );
};

export default page;
