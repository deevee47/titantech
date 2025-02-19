"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader as UITableHeader,
} from "@/components/ui/table";
import { SortField } from "@/types/user";

interface TableHeaderProps {
  sortBy: SortField;
  onSort: (field: SortField) => void;
}

export default function TableHeader({ sortBy, onSort }: TableHeaderProps) {
  return (
    <UITableHeader>
      <TableRow className="border-white/10">
        <TableHead className="text-gray-300">
          <Button
            variant="ghost"
            onClick={() => onSort("firstName")}
            className={`flex items-center gap-1 text-gray-300 hover:text-white ${
              sortBy === "firstName" ? "font-bold" : ""
            }`}
          >
            Name
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead className="text-gray-300">
          <Button
            variant="ghost"
            onClick={() => onSort("email")}
            className={`flex items-center gap-1 text-gray-300 hover:text-white ${
              sortBy === "email" ? "font-bold" : ""
            }`}
          >
            Email
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead className="text-gray-300">Phone</TableHead>
        <TableHead className="text-gray-300">
          <Button
            variant="ghost"
            onClick={() => onSort("companyName")}
            className={`flex items-center gap-1 text-gray-300 hover:text-white ${
              sortBy === "companyName" ? "font-bold" : ""
            }`}
          >
            Company
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead className="text-gray-300">Documents</TableHead>
        <TableHead className="text-gray-300">
          <Button
            variant="ghost"
            onClick={() => onSort("investmentAmount")}
            className={`flex items-center gap-1 text-gray-300 hover:text-white ${
              sortBy === "investmentAmount" ? "font-bold" : ""
            }`}
          >
            Investment
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead className="text-gray-300">Calendly</TableHead>
        <TableHead className="text-gray-300">
          Payment Status
        </TableHead>
        <TableHead className="text-gray-300">
          <Button
            variant="ghost"
            onClick={() => onSort("createdAt")}
            className={`flex items-center gap-1 text-gray-300 hover:text-white ${
              sortBy === "createdAt" ? "font-bold" : ""
            }`}
          >
            Created At
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </TableHead>
        <TableHead className="text-gray-300">Customer Note</TableHead>
        <TableHead className="text-gray-300">Remark</TableHead>
      </TableRow>
    </UITableHeader>
  );
}