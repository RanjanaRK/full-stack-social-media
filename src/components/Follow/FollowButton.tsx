"use client";

import follow from "@/actions/follow/follow.action";
import { toast } from "sonner";
import { Button } from "../ui/button";

type FollowButtonProps = {
  targetUserId: string;
  isFollowing: boolean;
};

const FollowButton = ({ targetUserId, isFollowing }: FollowButtonProps) => {
  const handleFollow = async () => {
    const { success, message } = await follow(targetUserId);
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <>
      <Button onClick={handleFollow} variant="ghost" size="sm">
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </>
  );
};

export default FollowButton;
