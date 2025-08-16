"use client";

import deleteComment from "@/actions/comment/deleteComment.action";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type CommentDeleteButtonProps = {
  commentId: string;
  commentUserId: string;
  currentUserId: string;
  postUserId: string;
};

const CommentDeleteButton = ({
  commentId,
  commentUserId,
  currentUserId,
  postUserId,
}: CommentDeleteButtonProps) => {
  const isCommenter = commentUserId === currentUserId;
  const isPostOwner = postUserId === currentUserId;

  //   console.log(commentId, commentUserId, currentUserId, postUserId);

  const deleteHandle = async () => {
    const { success, message } = await deleteComment(commentId);
    if (!success) {
      toast(message);
    }

    if (success) {
      toast(message);
    }
  };

  return (
    <>
      <div className="">
        {(isCommenter || isPostOwner) && (
          <Button
            onClick={deleteHandle}
            variant={"link"}
            size="icon"
            className=""
          >
            <Trash className="h-6 w-6" />
          </Button>
        )}
      </div>
    </>
  );
};

export default CommentDeleteButton;
