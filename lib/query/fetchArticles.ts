import { prisma } from "../prisma";

export const fetchArticleByQuery = async (searchText: string) => {
  const articles = prisma.articles.findMany({
    where: {
      OR: [
        { title: { contains: searchText, mode: "insensitive" } },
        { category: { contains: searchText, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
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
  return articles;
};
