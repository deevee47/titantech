"use client";

import React from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { debounce } from "lodash";
import { SortField } from "@/types/user";

interface SearchFiltersProps {
  onSearch: (value: string) => void;
  sortBy: SortField;
  sortOrder: "asc" | "desc";
  onSort: (field: SortField) => void;
  onSortOrderChange: () => void;
}

const SORT_OPTIONS = [
  { label: "Name", value: "firstName" },
  { label: "Email", value: "email" },
  { label: "Company", value: "companyName" },
  { label: "Investment", value: "investmentAmount" },
  { label: "Date Created", value: "createdAt" },
];

export default function SearchFilters({
  onSearch,
  sortBy,
  sortOrder,
  onSort,
  onSortOrderChange,
}: SearchFiltersProps) {
  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 300);

  return (
    <Card className="bg-black/40 backdrop-blur-md border border-white/10">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search by name, email, company..."
              onChange={(e) => debouncedSearch(e.target.value)}
              className="pl-8 bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="flex gap-2 items-center">
            <SlidersHorizontal className="h-4 w-4 text-gray-300" />
            <Select
              value={sortBy}
              onValueChange={(value) => onSort(value as SortField)}
            >
              <SelectTrigger className="w-[180px] bg-white/5 backdrop-blur-sm border-white/10 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 backdrop-blur-md border-white/10 text-white">
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={onSortOrderChange}
              className="w-10 bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10"
            >
              <ArrowUpDown
                className={`h-4 w-4 transition-transform ${
                  sortOrder === "desc" ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}