import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { UserWithPosts } from "@/lib/types";
import { headers } from "next/headers";

const getOtheruserData = async (userProfileId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: "unauthorized",
    };
  }

  try {
    const publicUserWithContent = await prisma.user.findUnique({
      where: { id: userProfileId },
      include: {
        posts: {
          select: {
            id: true,
            caption: true,
            imageFiles: true,
            comments: {
              select: {
                id: true,
                content: true,
                userId: true,
              },
            },
            reactions: {
              select: {
                id: true,
                emoji: true,
              },
            },
          },
        },
        followers: {
          include: {
            follower: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        following: {
          include: {
            following: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!publicUserWithContent) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      data: publicUserWithContent as UserWithPosts,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "failed to load",
    };
  }
};

export default getOtheruserData;
