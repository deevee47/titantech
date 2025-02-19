"use client";

import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { FileText, Calendar } from "lucide-react";
import UserDocuments from "./UserDocuments";
import EditableRemark from "./EditableRemark";
import { User, EditState } from "@/types/user";

interface UserRowProps {
  user: User;
  editingRemark: EditState | null;
  isUpdating: boolean;
  onEditRemark: (userId: string, currentRemark: string | null) => void;
  onSaveRemark: (userId: string) => void;
  onCancelEdit: () => void;
  onEditRemarkChange: (value: string) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

export default function UserRow({
  user,
  editingRemark,
  isUpdating,
  onEditRemark,
  onSaveRemark,
  onCancelEdit,
  onEditRemarkChange,
  formatCurrency,
  formatDate,
}: UserRowProps) {
  return (
    <TableRow className="border-white/10 hover:bg-white/5">
      <TableCell className="text-white">{`${user.firstName} ${user.lastName}`}</TableCell>
      <TableCell className="text-white">{user.email}</TableCell>
      <TableCell className="text-white">{user.phone}</TableCell>
      <TableCell className="text-white">
        {user.companyName}
      </TableCell>
      <TableCell className="text-white">
        <UserDocuments
          aadharFrontUrl={user.aadharFrontUrl}
          aadharBackUrl={user.aadharBackUrl}
          panCardUrl={user.panCardUrl}
        />
      </TableCell>
      <TableCell className="text-white">
        {formatCurrency(user.investmentAmount)}
      </TableCell>
      <TableCell className="text-white">
        {user.calendlyUrl ? (
          <a 
            href={user.calendlyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Schedule
          </a>
        ) : (
          <span className="text-gray-500">Not set</span>
        )}
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
        <EditableRemark
          remark={user.remark}
          userId={user.id}
          isEditing={editingRemark?.id === user.id}
          editingValue={editingRemark?.value || ""}
          isUpdating={isUpdating}
          onEdit={onEditRemark}
          onSave={onSaveRemark}
          onCancel={onCancelEdit}
          onValueChange={onEditRemarkChange}
        />
      </TableCell>
    </TableRow>
  );
}