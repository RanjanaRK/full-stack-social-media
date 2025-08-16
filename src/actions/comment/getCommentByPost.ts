"use server";

import prisma from "@/lib/prisma";

const getCommentByPost = async () => {
  try {
    const CommentOfPost = await prisma.comment.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        post: {
          select: {
            id: true,
          },
        },
      },
    });

    return {
      success: true,
      data: CommentOfPost,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "failed to load",
    };
  }
};

export default getCommentByPost;
