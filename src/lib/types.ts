import z from "zod";
import {
  commentFormSchema,
  editProfileFormSchema,
  emailSchema,
  forgotPasswordSchema,
  loginSchema,
  postCreateFormSchema,
  postEditFormSchema,
  resetPasswordschema,
  searchFormSchema,
  signUpSchema,
} from "./zodSchema";
import { Emojis } from "@prisma/client";

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type LoginFormSchemaType = z.infer<typeof loginSchema>;
export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordschema>;
export type EmailSchemaType = z.infer<typeof emailSchema>;
export type EditProfileFormSchemaType = z.infer<typeof editProfileFormSchema>;
export type PostCreateFormSchemaType = z.infer<typeof postCreateFormSchema>;
export type PostEditFormSchemaType = z.infer<typeof postEditFormSchema>;
export type CommentFormSchemaType = z.infer<typeof commentFormSchema>;
export type SearchFormSchemaType = z.infer<typeof searchFormSchema>;

export type createPostType = {
  caption: string;
  userId: string;
  imageFiles: { url: string }[];
};

export type UserProfile = {
  id: string;
  name: string;
  bio: string | null;
  image: string | null;
  followers: Array<{
    id: string;
    follower: {
      id: string;
      name: string;
      image: string | null;
    };
  }>;
  following: Array<{
    id: string;
    following: {
      id: string;
      name: string;
      image: string | null;
    };
  }>;
};

export type ReactionDetails = {
  id: string;
  emoji: Emojis;
  user: {
    id: string;
    name: string;
  };
};

export type ImageFile = {
  id: string;
  url: string;
  postId: string;
};

export type UserSummary = {
  id: string;
  name: string;
  image: string | null;
};

export type CommentDetails = {
  id: string;
  createdAt: Date;
  content: string;
  postId: string;
  user: UserSummary;
};

export type PostDetailsTypes = {
  id: string;
  caption?: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: UserProfile;
  imageFiles: ImageFile[];
  comments: CommentDetails[];
  reactions: ReactionDetails[];
};

export type ProfilePostDetailsTypes = {
  id: string;
  caption: string | null;
  imageFiles: ImageFile[];
  comments: {
    id: string;
  }[];
  reactions: {
    id: string;
  }[];
};

export type Followers = {
  id: string;
  followerId: string | null;
  followingId: string | null;
  follower: {
    id: string;
    name: string;
    image: string | null;
  };
};

export type UserWithPosts = {
  id: string;
  name: string;
  image: string | null;
  bio: string | null;
  posts: Array<{
    id: string;
    caption: string | null;
    imageFiles: Array<{
      id: string;
      url: string;
      postId: string;
    }>;
    comments: Array<{
      id: string;
      content: string;
      userId: string;
    }>;
    reactions: Array<{
      id: string;
      emoji: string;
    }>;
  }>;

  followers: Array<{
    id: string;
    follower: {
      id: string;
      name: string;
      image: string | null;
    };
  }>;

  following: Array<{
    id: string;
    following: {
      id: string;
      name: string;
      image: string | null;
    };
  }>;
};

export type searchUser = {
  id: string;
  name: string;
  image: string | null;
};
