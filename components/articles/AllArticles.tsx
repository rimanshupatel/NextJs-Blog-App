import Image from "next/image";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Prisma } from "@prisma/client";
import React from "react";
import { Search } from "lucide-react";

type AllArticlesProps = {
  articles: Prisma.ArticlesGetPayload<{
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
const AllArticles: React.FC<AllArticlesProps> = async ({ articles }) => {
  if (!articles.length) {
    return <NoSearchResults />;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="group relative overflow-hidden border border-gray-200 bg-white transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
        >
          <div className="p-6">
            {/* Image Container */}
            <div className="relative mb-6 h-60 w-full overflow-hidden rounded-lg">
              <Image
                src={article.featuredImage as string}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Category Badge */}
            <span className="mb-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {article.category}
            </span>

            {/* Article Title */}
            <h3 className="mb-3 text-xl font-bold text-gray-900 line-clamp-2 dark:text-white">
              {article.title}
            </h3>

            {/* Author & Metadata */}
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={article.author.imageUrl as string}
                    className="rounded-full"
                  />
                  <AvatarFallback>
                    {article.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {article.author.name}
                </span>
              </div>
              <time
                dateTime={article.createdAt.toISOString()}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AllArticles;
export function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Icon */}
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground">
        No Results Found
      </h3>

      {/* Description */}
      <p className="mt-2 text-muted-foreground">
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
}
