"use client"
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { getUsers } from "@/actions/user";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { debounce } from "lodash";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  investmentAmount: number;
  paymentDone: boolean;
  createdAt: string;
};

type SortField =
  | "firstName"
  | "lastName"
  | "email"
  | "companyName"
  | "investmentAmount"
  | "createdAt";

const SORT_OPTIONS = [
  { label: "Name", value: "firstName" },
  { label: "Email", value: "email" },
  { label: "Company", value: "companyName" },
  { label: "Investment", value: "investmentAmount" },
  { label: "Date Created", value: "createdAt" },
];

export default function UserTable() {
  // State
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [metadata, setMetadata] = useState({
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Debounced search function
  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page on new search
  }, 300);

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers({
        page,
        limit,
        search,
        sortBy,
        sortOrder,
      });

      if (response.success && response.data) {
        setUsers(response.data.users.map(user => ({
          ...user,
          createdAt: user.createdAt.toISOString()
        })));
        setMetadata(response.data.metadata);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, sortBy, sortOrder]);

  // Handle sort
  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setPage(1); // Reset to first page on sort change
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Advanced Search and Filters Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Box with Icon */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name, email, company..."
                onChange={(e) => debouncedSearch(e.target.value)}
                className="pl-8"
              />
            </div>

            {/* Sort Controls */}
            <div className="flex gap-2 items-center">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
              <Select
                value={sortBy}
                onValueChange={(value) => handleSort(value as SortField)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
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
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="w-10"
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

      {/* Results Summary */}
      <div className="text-sm text-gray-500">
        {loading ? "Looking for results..." : `Found ${metadata.total} users`}
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("firstName")}
                  className={`flex items-center gap-1 ${
                    sortBy === "firstName" ? "font-bold" : ""
                  }`}
                >
                  Name
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("email")}
                  className={`flex items-center gap-1 ${
                    sortBy === "email" ? "font-bold" : ""
                  }`}
                >
                  Email
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("companyName")}
                  className={`flex items-center gap-1 ${
                    sortBy === "companyName" ? "font-bold" : ""
                  }`}
                >
                  Company
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("investmentAmount")}
                  className={`flex items-center gap-1 ${
                    sortBy === "investmentAmount" ? "font-bold" : ""
                  }`}
                >
                  Investment
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("createdAt")}
                  className={`flex items-center gap-1 ${
                    sortBy === "createdAt" ? "font-bold" : ""
                  }`}
                >
                  Created At
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.companyName}</TableCell>
                  <TableCell>{formatCurrency(user.investmentAmount)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.paymentDone
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.paymentDone ? "Paid" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing {(page - 1) * limit + 1} to{" "}
          {Math.min(page * limit, metadata.total)} of {metadata.total} results
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(1)}
            disabled={!metadata.hasPreviousPage}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(page - 1)}
            disabled={!metadata.hasPreviousPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(page + 1)}
            disabled={!metadata.hasNextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(metadata.totalPages)}
            disabled={!metadata.hasNextPage}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
