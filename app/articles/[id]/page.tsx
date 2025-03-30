import ArticleDetailPage from "@/components/articles/ArticleDetailPage";
import { prisma } from "@/lib/prisma";
import React, { FC } from "react";

type articleDetailPageProps = {
  params: Promise<{ id: string }>;
};
const page: React.FC<articleDetailPageProps> = async ({ params }) => {
  const id = (await params).id;

  const article = await prisma.articles.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  if (!article) {
    return <h1>article not found</h1>;
  }
  return <ArticleDetailPage article={article} />;
};
export default page;
