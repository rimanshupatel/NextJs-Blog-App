"use client";
import React, { useOptimistic, useTransition } from "react";
import { Button } from "../ui/button";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import { likeDislike } from "@/actions/like-dislike";
import { Like } from "@prisma/client";

type LikebuttonProps = {
  articleID: string;
  likes: Like[];
  isLiked: boolean;
};
const ActionArticles: React.FC<LikebuttonProps> = ({
  articleID,
  likes,
  isLiked: initialIsLiked,
}) => {
  const [optimisticState, setOptimisticState] = useOptimistic(
    { count: likes.length, isLiked: initialIsLiked },
    (state, newIsLiked: boolean) => ({
      count: newIsLiked ? state.count + 1 : state.count - 1,
      isLiked: newIsLiked,
    })
  );
  const [isPending, startTransition] = useTransition();
  const handleLike = async () => {
    startTransition(async () => {
      setOptimisticState(!optimisticState.isLiked);
      await likeDislike(articleID);
    });
  };
  return (
    <div className="flex gap-4 mb-12 border-t pt-8">
      <form action={handleLike}>
        <Button
          type="submit"
          variant="ghost"
          className="gap-2"
          onClick={handleLike}
          disabled={isPending}
        >
          <ThumbsUp
            className="h-5 w-5"
            fill={optimisticState.isLiked ? "black" : "none"}
          />
          {optimisticState.count}
        </Button>
      </form>
      <Button variant="ghost" className="gap-2">
        <Bookmark className="h-5 w-5" /> Save
      </Button>
      <Button variant="ghost" className="gap-2">
        <Share2 className="h-5 w-5" /> Share
      </Button>
    </div>
  );
};

export default ActionArticles;
