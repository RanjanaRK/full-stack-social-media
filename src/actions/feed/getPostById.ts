"use server";

import prisma from "@/lib/prisma";
import { PostDetailsTypes } from "@/lib/types";

const getPostById = async ({ postId }: { postId: string }) => {
  try {
    const postById = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        imageFiles: true,
        comments: {
          orderBy: {
            createdAt: "asc",
          },
          select: {
            id: true,
            createdAt: true,
            content: true,
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        reactions: {
          select: {
            id: true,
            emoji: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      data: postById as PostDetailsTypes | null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "failed to load",
    };
  }
};

export default getPostById;
