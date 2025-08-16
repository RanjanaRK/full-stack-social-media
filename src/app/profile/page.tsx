import getUserData from "@/actions/profile/getUserData.action";
import MainLayout from "@/components/MainLayout";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfilePostCard from "@/components/Profile/ProfilePostCard";
import { CardContent } from "@/components/ui/card";

const page = async () => {
  const { data } = await getUserData();

  // console.log(data);

  if (!data) {
    return <div className="">undefined</div>;
  }

  // console.log(data.followers);
  // console.log(data?.posts.length);

  return (
    <>
      <MainLayout>
        <div className="space-y-6 px-10 py-8 md:pt-0 md:pb-0">
          <ProfileHeader
            profile={data}
            isEdit={true}
            isFollow={false}
            userProfileId=""
          />

          {data?.posts.length === 0 ? (
            <CardContent className="text-sm text-gray-500">no post</CardContent>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {data?.posts?.map((p) => {
                return (
                  <ProfilePostCard
                    userPost={p}
                    key={p.id}
                    isEditAndDelete={true}
                  />
                );
              })}
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default page;

{
  /* <div className="">
        <div className="relative md:w-60 md:h-80 w-40 h-48 overflow-hidden  group">
          {/* 1. The image: scales up slightly on hover */
}

{
  /* <Image
            src={"/socialBg.png"}
            alt=" post"
            fill
            priority
            className=" object-cover transition-transform duration-300  "
          />

          <div className="absolute inset-0 bg bg-black/70 bg-opacity-20 opacity-0 transition-opacity duration-300 flex items-center justify-center gap-4 group-hover:opacity-100">
            <button aria-label="Like" className="p-2  ">
              <HeartCrack className="h-5 w-5" fill="white" />
            </button>
            <button aria-label="Comment" className="p-2  ">
              <MessageCircle className="h-5 w-5" fill="white" />
            </button>
          </div> */
}
{
  /* </div> */
}
{
  /* // </div> */
}
