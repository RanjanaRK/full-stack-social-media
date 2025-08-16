"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Emojis } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

type CreateLikeType = {
  postId: string;
  emoji: Emojis;
};

const createLike = async ({ postId, emoji }: CreateLikeType) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return {
      success: false,
      error: "unauthorized",
    };
  }

  try {
    const existingLike = await prisma.reaction.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: postId,
        },
      },
    });

    if (existingLike) {
      if (existingLike.emoji === emoji) {
        await prisma.reaction.delete({
          where: {
            id: existingLike.id,
          },
        });

        revalidateTag(postId);

        return {
          success: true,
          message: "deleted",
        };
      } else {
        await prisma.reaction.update({
          where: {
            id: existingLike.id,
          },
          data: {
            emoji: emoji,
          },
        });

        revalidateTag(postId);
        return {
          success: true,
          message: "Reaction updated",
        };
      }
    }

    await prisma.reaction.create({
      data: {
        emoji,
        postId,
        userId: session.user.id,
      },
    });

    revalidateTag(postId);

    return {
      success: true,
      message: "Reacted ",
    };
  } catch (error) {
    console.log(error);

    return { success: false, error: "unexpected_error" };
  }
};

export default createLike;
