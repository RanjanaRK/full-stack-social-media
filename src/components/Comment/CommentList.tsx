import { CommentDetails } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CardContent } from "../ui/card";
import CommentDeleteButton from "./CommentDeleteButton";

type CommentListProps = {
  comments: CommentDetails[];
  postUserId: string;
  currentUserId: string;
};

const CommentList = async ({
  comments,
  postUserId,
  currentUserId,
}: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <CardContent className="text-sm text-gray-500">
        No comments yet. Be the first to chime in!
      </CardContent>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <div key={c.id} className="flex items-center gap-2">
          <Avatar className="h-6 w-6 rounded-full border text-center">
            <AvatarImage src={c.user.image || ""} alt={c.user.name} />
            <AvatarFallback>{c.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{c.user.name}</p>
            <p className="text-sm font-semibold">{c.postId}</p>
            <p className="text-xs text-gray-600">
              {new Date(c.createdAt).toLocaleDateString()}
            </p>
          </div>
          <p className="mt-2 text-sm">{c.content}</p>
          <CommentDeleteButton
            commentUserId={c.user.id}
            commentId={c.id}
            currentUserId={currentUserId}
            postUserId={postUserId}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentList;
