"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

const getUserData = async () => {
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
    const userWithContent = await prisma.user.findUnique({
      where: { id: session.user.id },
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

    if (!userWithContent) {
      return {
        success: false,
        message: "User not found",
      };
    }

    console.log(userWithContent);

    return {
      success: true,
      data: userWithContent,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "failed to load",
    };
  }
};

export default getUserData;
