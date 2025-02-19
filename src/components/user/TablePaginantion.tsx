"use client";

import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TablePaginationProps {
  page: number;
  limit: number;
  totalItems: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
}

export default function TablePagination({
  page,
  limit,
  totalItems,
  hasMore,
  onPageChange,
}: TablePaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-300">
        Showing {totalItems === 0 ? 0 : (page - 1) * limit + 1} to{" "}
        {Math.min(page * limit, totalItems)} of {totalItems} results
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          className="bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasMore}
          className="bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(Math.ceil(totalItems / limit))}
          disabled={!hasMore}
          className="bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}