import EditArticles from "@/components/articles/EditArticles";
import { prisma } from "@/lib/prisma";
import React from "react";

type ArticleEditProps = {
  params: Promise<{ id: string }>;
};

const page: React.FC<ArticleEditProps> = async ({ params }) => {
  const id = (await params).id;
  const article = await prisma.articles.findUnique({
    where: {
      id,
    },
  });
  if (!article) {
    return <h1>article not found for this {id}</h1>;
  }
  return <EditArticles article={article} />;
};

export default page;
