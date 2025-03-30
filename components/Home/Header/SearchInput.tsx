"use client";
import { searchAction } from "@/actions/searchAction";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function SearchInput() {
  const params = useSearchParams();
  return (
    <form action={searchAction}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="input"
          name="search"
          placeholder="Search..."
          className="h-12 px-8 text-lg rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
          defaultValue={params.get("search") || ""}
        />
      </div>
    </form>
  );
}
