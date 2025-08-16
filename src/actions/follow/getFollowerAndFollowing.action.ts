import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

const getFollowerAndFollowing = async (userId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUserId = session?.user?.id;

  if (!currentUserId) {
    return {
      success: false,
      error: "unauthorized",
    };
  }
  try {
    const follower = await prisma.follow.findMany({
      where: {
        followingId: userId,
      },
      include: {
        follower: true,
      },
    });

    const following = await prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return {
      success: true,
      followerData: follower,
      followingData: following,
    };
  } catch (error) {
    console.log(error);
  }
};

export default getFollowerAndFollowing;
