"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { LoginFormSchemaType, SignUpSchemaType } from "@/lib/types";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";

export const signUpEmailAction = async (values: SignUpSchemaType) => {
  try {
    const { user } = await auth.api.signUpEmail({
      headers: await headers(),
      body: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    });

    return {
      error: null,
      success: true,
      message:
        "Created your account. Please verify your email address, Email verification link sent on your email.",
      data: user,
    };
  } catch (error) {
    // console.error("Sign-up failed:", error);
    const message = error instanceof APIError ? error.message : "Unknown error";

    return {
      error: message,
      success: false,
      data: null,
    };
  }
};

export const signInEmailAction = async (values: LoginFormSchemaType) => {
  const user = await prisma.user.findUnique({
    where: { email: values.email },
  });

  if (!user) {
    return {
      success: false,
      message: "Email does not exist.",
    };
  }

  if (!user.emailVerified) {
    return {
      success: false,
      message:
        "Your email hasn't been verified yet. Please check your inbox to complete the verification process.",
    };
  }

  try {
    const { user } = await auth.api.signInEmail({
      body: {
        email: values.email,
        password: values.password,
        callbackURL: "/feed",
      },
    });

    return {
      error: null,
      success: true,
      message: "Logged in successfully",
      data: user,
    };
  } catch (error) {
    const message = error instanceof APIError ? error.message : "Unknown error";

    return {
      error: message,
      success: false,
      data: null,
    };
  }
};

export const searchEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return !!user;
  } catch (error) {
    console.log(error);
  }
};
