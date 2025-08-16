import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum 2 characters are required" })
    .max(20, { message: "Maximum of 20 characters are allowed" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must be at most 20 characters long" }),
});

export const editProfileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Minimum 2 characters are required" })
    .max(20, { message: "Maximum of 20 characters are allowed" }),
  bio: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export const resetPasswordschema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const emailSchema = z.object({
  email: z.string().email("Please enter a valid email."),
});

export const postCreateFormSchema = z.object({
  caption: z.string().optional(),
});

export const postEditFormSchema = z.object({
  caption: z.string().optional(),
});

export const commentFormSchema = z.object({
  content: z.string(),
});

export const searchFormSchema = z.object({
  text: z.string(),
});
