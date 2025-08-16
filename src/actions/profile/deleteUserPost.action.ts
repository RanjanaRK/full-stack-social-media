"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const deleteUserPost = async (postId: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post || post.userId !== userId) {
      return {
        success: false,

        error: "Not allowed to delete this post",
      };
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath("/profile");

    return {
      success: true,
      message: "Post deleted",
    };
  } catch (error) {
    console.log("failed to delete post", error, userId, postId);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export default deleteUserPost;
