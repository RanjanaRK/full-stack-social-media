"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

const editUserPost = async ({
  caption,
  postId,
}: {
  caption: string;
  postId: string;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      include: { user: true },
    });

    if (!existingPost || existingPost.userId !== session.user.id) {
      return {
        success: false,
        error: "Not Allowed",
      };
    }

    await prisma.post.update({
      where: { id: postId },
      data: {
        caption: caption ?? null,
      },
    });

    revalidateTag(`user-profile-${session.user.id}`);

    return {
      success: true,
      message: "post updated",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export default editUserPost;
