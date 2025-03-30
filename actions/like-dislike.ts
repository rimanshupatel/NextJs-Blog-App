"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const likeDislike = async (articleID: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("you must logged in to like this post");
  }

  const user = await prisma.user.findUnique({
    where: { clearUserID: userId },
  });

  if (!user) {
    throw new Error("user not exist in database");
  }

  const existingLike = await prisma.like.findFirst({
    where: { articleID, userID: user.id },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    await prisma.like.create({
      data: {
        articleID,
        userID: user.id,
      },
    });
  }

  revalidatePath(`/articles/${articleID}`);
};
