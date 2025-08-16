"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

type EditProfileInfo = {
  name?: string;
  bio?: string;
};

const editProfileInfo = async ({ name, bio }: EditProfileInfo) => {
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
        name: name,
        bio: bio,
      },
    });

    revalidateTag(`user-profile-${userId}`);

    return {
      success: true,
      message: "profile info updated",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export default editProfileInfo;
