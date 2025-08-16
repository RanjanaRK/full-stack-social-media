"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const follow = async (targetUserId: string) => {
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
    const existingFollower = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: targetUserId,
        },
      },
    });

    if (existingFollower) {
      await prisma.follow.delete({
        where: {
          id: existingFollower.id,
        },
      });

      revalidatePath("profile");

      return {
        success: true,
        message: "Unfollow",
      };
    }

    await prisma.follow.create({
      data: {
        followerId: currentUserId,
        followingId: targetUserId,
      },
    });

    revalidatePath("profile");

    return {
      success: true,
      message: "Followed",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "something went wrong!",
    };
  }
};

export default follow;
