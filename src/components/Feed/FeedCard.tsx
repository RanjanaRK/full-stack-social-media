import { auth } from "@/lib/auth";
import { PostDetailsTypes } from "@/lib/types";
import { MessageCircle } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import CommentForm from "../Comment/CommentForm";
import CommentList from "../Comment/CommentList";
import ReactionBar from "../Like/ReactionBar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CarouselFeedPost from "./CarouselFeedPost";

type FeedCardProps = {
  posts: PostDetailsTypes;
  showCommentForm: boolean;
  showCommentDetail: boolean;
};

const FeedCard = async ({
  posts,
  showCommentForm,
  showCommentDetail,
}: FeedCardProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  if (!userId) {
    return;
  }

  return (
    <>
      <Card className="w-[400px] rounded-none border-t-0 border-r-0 border-b border-l-0 bg-transparent shadow-none">
        <CardHeader className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/profile/${posts.user.id}`}>
              <Avatar>
                <AvatarImage src={posts?.user?.image || ""} alt={"name"} />
                <AvatarFallback>
                  {posts.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <CardTitle className="text-sm font-semibold capitalize">
                {posts.user.name}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-xs">
                {new Date(posts.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 text-sm">
          <p>{posts?.caption}</p>

          <CarouselFeedPost imageUrl={posts.imageFiles} />
        </CardContent>

        <CardFooter className="flex-col items-start justify-start gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <Suspense>
                <ReactionBar
                  postId={posts.id}
                  currentUserReact={
                    posts.reactions.find((e) => e.user.id === userId)?.emoji ||
                    null
                  }
                />
                {posts.reactions.length}
              </Suspense>
            </div>
            <Suspense fallback="Loading...">
              <Link
                href={`/feed/${posts.id}`}
                className="flex items-center gap-1 text-sm hover:text-gray-800"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{posts.comments.length}</span>
              </Link>
            </Suspense>
          </div>

          {showCommentDetail && (
            <>
              <CommentList
                comments={posts.comments}
                postUserId={posts.user.id}
                currentUserId={userId}
              />
            </>
          )}
          {showCommentForm && (
            <>
              <CommentForm postId={posts.id} />
            </>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default FeedCard;
