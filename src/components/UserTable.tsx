"use client";

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
import { getUsers, updateUserRemark } from "@/actions/user";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Search,
  SlidersHorizontal,
  FileText,
  Edit2,
  Check,
  X,
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
  remark: string | null;
  customerNote: string | null;
  createdAt: string;
};

type SortField =
  | "firstName"
  | "lastName"
  | "email"
  | "companyName"
  | "investmentAmount"
  | "createdAt";

interface EditState {
  id: string;
  value: string;
}

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
  const [totalItems, setTotalItems] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [limit] = useState(10);
  const [sortBy, setSortBy] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [editingRemark, setEditingRemark] = useState<EditState | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Debounced search function
  const debouncedSearch = debounce((value: string) => {
    setSearch(value);
    setPage(1);
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
        setUsers(
          response.data.users.map((user) => ({
            ...user,
            createdAt: user.createdAt.toISOString(),
          }))
        );
        setTotalItems(response.data.metadata.total);
        setHasMore(response.data.metadata.hasNextPage);
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
    setPage(1);
  };

  // Handle remark edit
  const handleEditRemark = (userId: string, currentRemark: string | null) => {
    setEditingRemark({
      id: userId,
      value: currentRemark || "",
    });
  };

  // Handle remark save
  const handleSaveRemark = async (userId: string) => {
    if (!editingRemark) return;

    setIsUpdating(true);
    try {
      const response = await updateUserRemark(userId, editingRemark.value);
      if (response.success) {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, remark: editingRemark.value } : user
          )
        );
      }
    } catch (error) {
      console.error("Error updating remark:", error);
    } finally {
      setIsUpdating(false);
      setEditingRemark(null);
    }
  };

  // Handle remark cancel
  const handleCancelEdit = () => {
    setEditingRemark(null);
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-3xl"
          style={{
            top: "20%",
            left: "60%",
            transform: "translate(-50%, -50%)",
            animation: "blob1 7s infinite ease-in-out",
          }}
        />
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-3xl"
          style={{
            top: "60%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            animation: "blob2 8s infinite ease-in-out",
          }}
        />
      </div>

      <div className="relative z-10 p-8 space-y-6">
        <h1 className="text-3xl font-bold text-white mb-8">User Management</h1>

        {/* Search and Filters */}
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
                  onValueChange={(value) => handleSort(value as SortField)}
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
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
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

        {/* Results Summary */}
        <div className="text-sm text-gray-300">
          {loading ? "Loading results..." : `Found ${totalItems} users`}
        </div>

        {/* Table */}
        <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-gray-300">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("firstName")}
                      className={`flex items-center gap-1 text-gray-300 hover:text-white ${
                        sortBy === "firstName" ? "font-bold" : ""
                      }`}
                    >
                      Name
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  {/* Repeat for other TableHead elements, keeping the same styling */}
                  {/* ... other table headers ... */}
                  <TableHead className="text-gray-300">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("email")}
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
                      onClick={() => handleSort("companyName")}
                      className={`flex items-center gap-1 text-gray-300 hover:text-white ${
                        sortBy === "companyName" ? "font-bold" : ""
                      }`}
                    >
                      Company
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("investmentAmount")}
                      className={`flex items-center gap-1 text-gray-300 hover:text-white ${
                        sortBy === "investmentAmount" ? "font-bold" : ""
                      }`}
                    >
                      Investment
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-gray-300">
                    Payment Status
                  </TableHead>
                  <TableHead className="text-gray-300">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("createdAt")}
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
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-10 text-gray-300"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-10 text-gray-300"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-white/10 hover:bg-white/5"
                    >
                      <TableCell className="text-white">{`${user.firstName} ${user.lastName}`}</TableCell>
                      <TableCell className="text-white">{user.email}</TableCell>
                      <TableCell className="text-white">{user.phone}</TableCell>
                      <TableCell className="text-white">
                        {user.companyName}
                      </TableCell>
                      <TableCell className="text-white">
                        {formatCurrency(user.investmentAmount)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.paymentDone
                              ? "bg-green-100/20 text-green-400"
                              : "bg-red-100/20 text-red-400"
                          }`}
                        >
                          {user.paymentDone ? "Paid" : "Pending"}
                        </span>
                      </TableCell>
                      <TableCell className="text-white">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 max-w-[200px]">
                          <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span
                            className="truncate text-white"
                            title={user.customerNote || "No note"}
                          >
                            {user.customerNote || "No note"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {editingRemark?.id === user.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={editingRemark.value}
                              onChange={(e) =>
                                setEditingRemark({
                                  ...editingRemark,
                                  value: e.target.value,
                                })
                              }
                              className="h-8 w-[200px] bg-white/5 backdrop-blur-sm border-white/10 text-white"
                              disabled={isUpdating}
                              placeholder="Enter remark..."
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSaveRemark(user.id)}
                              disabled={isUpdating}
                              className="p-1 text-green-400 hover:text-green-300"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleCancelEdit}
                              disabled={isUpdating}
                              className="p-1 text-red-400 hover:text-red-300"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 max-w-[200px]">
                            <span
                              className="truncate text-white"
                              title={user.remark || "No remark"}
                            >
                              {user.remark || "No remark"}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleEditRemark(user.id, user.remark)
                              }
                              className="p-1 text-gray-400 hover:text-white"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-300">
            Showing {(page - 1) * limit + 1} to{" "}
            {Math.min(page * limit, totalItems)} of {totalItems} results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(page + 1)}
              disabled={!hasMore}
              className="bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(Math.ceil(totalItems / limit))}
              disabled={!hasMore}
              className="bg-white/5 backdrop-blur-sm border-white/10 text-white hover:bg-white/10 disabled:opacity-30"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob1 {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        @keyframes blob2 {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1.2);
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
