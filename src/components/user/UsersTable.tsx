"use client";

import React from "react";
import { TableCell, TableRow, TableBody, Table } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import UserRow from "./UserRow";
import TableHeader from "./TableHeader";
import { User, EditState, SortField } from "@/types/user";

interface UsersTableProps {
  users: User[];
  loading: boolean;
  sortBy: SortField;
  editingRemark: EditState | null;
  isUpdating: boolean;
  onSort: (field: SortField) => void;
  onEditRemark: (userId: string, currentRemark: string | null) => void;
  onSaveRemark: (userId: string) => void;
  onCancelEdit: () => void;
  onEditRemarkChange: (value: string) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

export default function UsersTable({
  users,
  loading,
  sortBy,
  editingRemark,
  isUpdating,
  onSort,
  onEditRemark,
  onSaveRemark,
  onCancelEdit,
  onEditRemarkChange,
  formatCurrency,
  formatDate,
}: UsersTableProps) {
  return (
    <Card className="bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader sortBy={sortBy} onSort={onSort} />
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={11} 
                  className="text-center py-10 text-gray-300"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center py-10 text-gray-300"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  editingRemark={editingRemark}
                  isUpdating={isUpdating}
                  onEditRemark={onEditRemark}
                  onSaveRemark={onSaveRemark}
                  onCancelEdit={onCancelEdit}
                  onEditRemarkChange={onEditRemarkChange}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}