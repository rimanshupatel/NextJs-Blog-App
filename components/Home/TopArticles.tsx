import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function TopArticles() {
  // const articles = [
  //   {
  //     id: "1",
  //     title: "The Future of Artificial Intelligence in Everyday Life",
  //     category: "Technology",
  //     featuredImage: "https://source.unsplash.com/random/600x400/?ai",
  //     createdAt: "2023-11-15T09:30:00Z",
  //     author: {
  //       name: "Alex Johnson",
  //       imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  //     },
  //     readTime: 8,
  //   },
  //   {
  //     id: "2",
  //     title: "Sustainable Living: Small Changes with Big Impact",
  //     category: "Environment",
  //     featuredImage:
  //       "https://source.unsplash.com/random/600x400/?sustainability",
  //     createdAt: "2023-11-10T14:15:00Z",
  //     author: {
  //       name: "Maria Garcia",
  //       imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  //     },
  //     readTime: 12,
  //   },
  // ];
  const articles = await prisma.articles.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.slice(0, 3).map((article) => (
        <Card
          key={article.id}
          className={cn(
            "group relative overflow-hidden transition-all hover:scale-[1.02]",
            "border border-gray-200/50 dark:border-white/10",
            "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
          )}
        >
          <div className="p-6">
            <Link href={`/articles/${article.id}`}>
              {/* Image Container */}
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                <Image
                  src={article.featuredImage as string}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.imageUrl as string} />
                  <AvatarFallback>
                    {article.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{article.author.name}</span>
              </div>

              {/* Article Title */}
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {article.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {article.category}
              </p>

              {/* Article Meta Info */}
              <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(article.createdAt).toDateString()}</span>
                <span>{12} min read</span>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
