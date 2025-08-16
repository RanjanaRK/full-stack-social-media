"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

type createCommentProps = {
  content: string;
  postId: string;
};

const createComment = async ({ content, postId }: createCommentProps) => {
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

  const existingPost = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!existingPost) {
    return { success: false, message: "post not found" };
  }

  try {
    await prisma.comment.create({
      data: {
        content: content,
        user: {
          connect: {
            id: session.user.id,
          },
        },
        post: {
          connect: { id: postId },
        },
      },
    });

    revalidateTag(`user-post-${postId}`);

    return {
      success: true,
      message: "post your comment",
    };
  } catch (error) {
    // const context = {
    //   action: "createComment",
    //   userId: session.user.id,
    //   postId: postId,
    // };

    // if (error instanceof Prisma.PrismaClientKnownRequestError) {

    //   logger.error(
    //     { ...context, code: error.code, meta: error.meta },
    //     "Prisma error"
    //   );
    //   captureException(error, context);
    //   return { success: false, error: "comment_already_exists" };
    // }

    // // Fallback for unexpected errors
    // logger.error({ ...context, error }, "Unexpected error");
    // captureException(error, context);
    return { success: false, message: "unexpected_error", error };
  }
};

export default createComment;
