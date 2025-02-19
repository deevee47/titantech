"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Check, X } from "lucide-react";

interface EditableRemarkProps {
  remark: string | null;
  userId: string;
  isEditing: boolean;
  editingValue: string;
  isUpdating: boolean;
  onEdit: (userId: string, currentRemark: string | null) => void;
  onSave: (userId: string) => void;
  onCancel: () => void;
  onValueChange: (value: string) => void;
}

export default function EditableRemark({
  remark,
  userId,
  isEditing,
  editingValue,
  isUpdating,
  onEdit,
  onSave,
  onCancel,
  onValueChange,
}: EditableRemarkProps) {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          value={editingValue}
          onChange={(e) => onValueChange(e.target.value)}
          className="h-8 w-[200px] bg-white/5 backdrop-blur-sm border-white/10 text-white"
          disabled={isUpdating}
          placeholder="Enter remark..."
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSave(userId)}
          disabled={isUpdating}
          className="p-1 text-green-400 hover:text-green-300"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={isUpdating}
          className="p-1 text-red-400 hover:text-red-300"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 max-w-[200px]">
      <span
        className="truncate text-white"
        title={remark || "No remark"}
      >
        {remark || "No remark"}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onEdit(userId, remark)}
        className="p-1 text-gray-400 hover:text-white"
      >
        <Edit2 className="h-4 w-4" />
      </Button>
    </div>
  );
}