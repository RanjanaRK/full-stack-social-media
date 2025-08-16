import { getAllPosts } from "@/actions/feed/getAllFeed.action";
import FeedCard from "@/components/Feed/FeedCard";
import MainLayout from "@/components/MainLayout";

const page = async () => {
  const result = await getAllPosts();

  if (!result.success) {
    throw new Error("something wrong");
  }

  return (
    <>
      <MainLayout>
        <div className="grid place-items-center pt-12 pb-6 md:pt-0 md:pb-0">
          {result.data?.map((post) => (
            <FeedCard
              key={post.id}
              posts={post}
              showCommentDetail={false}
              showCommentForm={true}
            />
          ))}
        </div>
      </MainLayout>
    </>
  );
};

export default page;
