import getOtheruserData from "@/actions/profile/getOtheruserData";
import MainLayout from "@/components/MainLayout";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfilePostCard from "@/components/Profile/ProfilePostCard";
import { CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";

const page = async ({
  params,
}: {
  params: Promise<{ userProfileId: string }>;
}) => {
  const { userProfileId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  const { data } = await getOtheruserData(userProfileId);

  // console.log(data);

  if (!data) {
    return;
  }

  const isFollowing = data.followers.some((f) => f.follower.id === userId);

  // console.log(isFollowing);

  return (
    <>
      <MainLayout>
        <div className="w-full space-y-6 px-10 py-8">
          <ProfileHeader
            profile={data}
            isEdit={userId === userProfileId}
            isFollow={isFollowing}
            userProfileId={userProfileId}
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
                    isEditAndDelete={userId === userProfileId}
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
