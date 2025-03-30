import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
type commentsListProps = {
  comments: Prisma.CommentGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

const CommentList: React.FC<commentsListProps> = ({ comments }) => {
  return (
    <div className="space-y-8">
      {comments.map((comments) => (
        <div key={comments.id} className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={comments.author.imageUrl || ""}
              className="rounded-full"
            />
            <AvatarFallback>{comments.author.name}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-2">
              <span className="font-medium text-foreground">
                {comments.author.name}
              </span>
              <span className="text-sm text-muted-foreground ml-2">
                {comments.createdAt.toDateString()}
              </span>
            </div>
            <p className="text-muted-foreground">{comments.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
