"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

const deleteComment = async (commentId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session?.user.id);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "unauthorized",
    };
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      select: {
        userId: true,
        post: {
          select: { userId: true, id: true },
        },
      },
    });

    if (!comment) {
      return {
        success: false,
        error: "Comment not found",
      };
    }

    const isCommenter = comment.userId === session.user.id;
    const isPostOwner = comment.post.userId === session.user.id;

    if (!isCommenter && !isPostOwner) {
      return {
        success: false,
        error: "Not Allowed",
      };
    }

    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    revalidateTag(`user-post-${comment.post.id}`);

    return {
      success: true,
      message: "Comment deleted",
    };
  } catch (error) {
    console.log("failed to delete comment", error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export default deleteComment;
