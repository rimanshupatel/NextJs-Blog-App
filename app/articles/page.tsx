import AllArticles from "@/components/articles/AllArticles";
import SearchInput from "@/components/Home/Header/SearchInput";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { fetchArticleByQuery } from "@/lib/query/fetchArticles";
import React, { Suspense } from "react";
import Link from "next/link";
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
  searchParams: Promise<{ search?: string; page?: string }>;
};
const page: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const searchText = (await searchParams).search || "";
  const ITEMS_PER_PAGE = 3;
  const currentPage = Number((await searchParams).page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;
  const { articles, total } = await fetchArticleByQuery(searchText, skip, take);

  const total_page = Math.ceil(total / ITEMS_PER_PAGE);
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
      <div className="mt-12 flex justify-center gap-2">
        {/* Prev Button */}
        <Link
          href={`?search=${searchText}&page=${currentPage - 1}`}
          passHref
          className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
        >
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === 1}
            className={currentPage === 1 ? "cursor-not-allowed" : ""}
          >
            ← Prev
          </Button>
        </Link>

        {/* Page Numbers */}
        {Array.from({ length: total_page }).map((_, index) => (
          <Link
            key={index}
            href={`?search=${searchText}&page=${index + 1}`}
            passHref
          >
            <Button
              variant={currentPage === index + 1 ? "outline" : "ghost"}
              size="sm"
            >
              {index + 1}
            </Button>
          </Link>
        ))}

        {/* Next Button */}
        <Link
          href={`?search=${searchText}&page=${currentPage + 1}`}
          passHref
          className={
            currentPage === total_page ? "pointer-events-none opacity-50" : ""
          }
        >
          <Button
            variant="ghost"
            size="sm"
            disabled={currentPage === total_page}
            className={currentPage === total_page ? "cursor-not-allowed" : ""}
          >
            Next →
          </Button>
        </Link>
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
