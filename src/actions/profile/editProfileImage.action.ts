"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

const editProfileImage = async (imageUrl: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        image: imageUrl,
      },
    });

    revalidateTag(`user-profile-${userId}`);

    return {
      success: true,
      message: "profile Image updated",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export default editProfileImage;
