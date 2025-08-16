"use server";

import prisma from "@/lib/prisma";
import { PostDetailsTypes } from "@/lib/types";

export const getAllPosts = async (): Promise<
  | { success: true; data: PostDetailsTypes[] }
  | { success: false; error: string }
> => {
  try {
    const rawPost = await prisma.post.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            bio: true,
            followers: {
              select: {
                id: true,
                follower: { select: { id: true, name: true, image: true } },
              },
            },
            following: {
              select: {
                id: true,
                following: { select: { id: true, name: true, image: true } },
              },
            },
          },
        },
        imageFiles: { select: { id: true, url: true, postId: true } },
        comments: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            createdAt: true,
            content: true,
            postId: true,
            user: { select: { id: true, name: true, image: true } },
          },
        },
        reactions: {
          select: {
            id: true,
            emoji: true,
            user: { select: { id: true, name: true } },
          },
        },
      },
    });

    return { success: true, data: rawPost };
  } catch (error) {
    console.error("[getAllPosts] failed:", error);
    return { success: false, error: "failed to load feed" };
  }
};
