"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

const followingUser = async (id: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUserId = session?.user?.id;

  if (!currentUserId) {
    return {
      success: false,
      error: "unauthorized",
    };
  }
  try {
    await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        followers: true,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
  }
};

export default followingUser;
