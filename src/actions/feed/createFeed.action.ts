"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

// type createPostprops = {
//   caption?: string | null;
//   imageFiles: {
//     url: string;
//   }[];
// };

export const createPost = async ({
  caption,
  imageFiles,
}: {
  caption?: string | null;
  imageFiles: { url: string }[];
}) => {
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
    const post = await prisma.post.create({
      data: {
        caption: caption ?? null,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    await prisma.imageFile.createMany({
      data: imageFiles.map((img) => ({
        url: img.url,
        postId: post.id,
      })),
    });

    return {
      success: true,
      message: "successfully created post",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "failed to create",
    };
  }
};
