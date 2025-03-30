import AllArticles from "@/components/articles/AllArticles";
import SearchInput from "@/components/Home/Header/SearchInput";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { fetchArticleByQuery } from "@/lib/query/fetchArticles";
import React, { Suspense } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

type SearchPageProps = {
  searchParams: Promise<{ search?: string }>;
};
const page: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const searchText = (await searchParams).search || "";
  const articles = await fetchArticleByQuery(searchText);
  const ITEMS_PER_PAGE = 3;
  return (
    <section className="container mx-auto px-4 py-12 ">
      {/* Header Section */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          Our Top Articles
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Subscribe to our blog posts to get the latest updates delivered to
          your inbox
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-12 flex justify-center items-center">
        <div className="w-full max-w-md">
          <SearchInput />
        </div>
        <Button
          type="submit"
          variant="default"
          className="h-11 w-20 mx-4 cursor-pointer"
        >
          search
        </Button>
      </div>

      {/* Articles Grid */}
      <div className="mb-16">
        <Suspense fallback={<AllArticlesPageSkeleton />}>
          <AllArticles articles={articles} />
        </Suspense>
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent className="gap-2">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className="h-10 w-10 rounded-md border border-gray-200 hover:bg-gray-50"
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="h-10 w-10 rounded-md border border-gray-200 hover:bg-gray-50"
                isActive
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                className="h-10 w-10 rounded-md border border-gray-200 hover:bg-gray-50"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};
export default page;

export function AllArticlesPageSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-6">
            {/* Article Image Skeleton */}
            <Skeleton className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20" />

            {/* Article Title Skeleton */}
            <Skeleton className="h-6 w-3/4 rounded-lg" />

            {/* Article Category Skeleton */}
            <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />

            {/* Author & Metadata Skeleton */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Author Avatar Skeleton */}
                <Skeleton className="h-8 w-8 rounded-full" />

                {/* Author Name Skeleton */}
                <Skeleton className="h-4 w-20 rounded-lg " />
              </div>

              {/* Date Skeleton */}
              <Skeleton className="h-4 w-24 rounded-lg " />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
