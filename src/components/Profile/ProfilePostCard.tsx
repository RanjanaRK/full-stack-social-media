"use client";

import { ProfilePostDetailsTypes } from "@/lib/types";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteUserPost from "./DeleteUserPost";

type ProfilePostCardProps = {
  userPost: ProfilePostDetailsTypes;
  isEditAndDelete: boolean;
};

const ProfilePostCard = ({
  userPost,
  isEditAndDelete,
}: ProfilePostCardProps) => {
  return (
    <>
      <div className="group relative w-full overflow-hidden rounded-lg border pb-[100%]">
        {isEditAndDelete && <DeleteUserPost pDetail={userPost} />}

        {userPost.imageFiles.map((img) => {
          return (
            <Image
              key={img.id}
              src={img.url}
              alt="post"
              fill
              sizes="100"
              priority
              className="object-cover transition-transform"
            />
          );
        })}

        <div className="absolute inset-0 flex items-center justify-center space-x-4 bg-black/70 opacity-0 transition-opacity group-hover:opacity-100">
          <Link href={`/feed/${userPost.id}`} className="space-x-4">
            <button>
              <Heart fill="white" />
              <span className="text-white">{userPost.reactions.length}</span>
            </button>
            <button>
              <MessageCircle fill="white" />

              <span className="text-white">{userPost.comments.length}</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfilePostCard;
