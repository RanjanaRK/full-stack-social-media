"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

const getAllUser = async (query: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: "unauthorized",
    };
  }

  if (!query) {
    return { success: true, data: [], message: "No result found" };
  }

  try {
    const allUser = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    return {
      success: true,
      data: allUser,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "failed to load",
    };
  }
};

export default getAllUser;
