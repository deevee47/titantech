"use client"
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface DocumentsStepProps {
  userData: {
    investmentAmount: string;
    customerNote: string;
    aadharFront: File | null;
    aadharBack: File | null;
    panCard: File | null;
  };
  fileNames: {
    aadharFront: string;
    aadharBack: string;
    panCard: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, field: string) => void;
  errors: {
    [key: string]: string | undefined;
  };
}

const DocumentsStep: React.FC<DocumentsStepProps> = ({
  userData,
  fileNames,
  handleInputChange,
  handleFileChange,
  errors,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Aadhar Front */}
        <div className="space-y-2">
          <Label htmlFor="aadharFront" className="text-gray-300">
            Aadhar Card (Front) <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="aadharFront"
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => handleFileChange(e, "aadharFront")}
              className="hidden"
            />
            <Button
              onClick={() => document.getElementById("aadharFront")?.click()}
              variant="outline"
              className={`w-full bg-white/5 backdrop-blur-sm border-dashed ${
                errors.aadharFront ? "border-red-500" : "border-white/20"
              } text-white hover:bg-white/10 py-8`}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-6 h-6" />
                <span>{fileNames.aadharFront || "Upload Aadhar Front"}</span>
              </div>
            </Button>
            {errors.aadharFront && (
              <p className="text-sm text-red-500 mt-1">{errors.aadharFront}</p>
            )}
          </div>
        </div>

        {/* Aadhar Back */}
        <div className="space-y-2">
          <Label htmlFor="aadharBack" className="text-gray-300">
            Aadhar Card (Back) <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="aadharBack"
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => handleFileChange(e, "aadharBack")}
              className="hidden"
            />
            <Button
              onClick={() => document.getElementById("aadharBack")?.click()}
              variant="outline"
              className={`w-full bg-white/5 backdrop-blur-sm border-dashed ${
                errors.aadharBack ? "border-red-500" : "border-white/20"
              } text-white hover:bg-white/10 py-8`}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-6 h-6" />
                <span>{fileNames.aadharBack || "Upload Aadhar Back"}</span>
              </div>
            </Button>
            {errors.aadharBack && (
              <p className="text-sm text-red-500 mt-1">{errors.aadharBack}</p>
            )}
          </div>
        </div>

        {/* PAN Card */}
        <div className="space-y-2">
          <Label htmlFor="panCard" className="text-gray-300">
            PAN Card <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="panCard"
              type="file"
              accept=".pdf,image/*"
              onChange={(e) => handleFileChange(e, "panCard")}
              className="hidden"
            />
            <Button
              onClick={() => document.getElementById("panCard")?.click()}
              variant="outline"
              className={`w-full bg-white/5 backdrop-blur-sm border-dashed ${
                errors.panCard ? "border-red-500" : "border-white/20"
              } text-white hover:bg-white/10 py-8`}
            >
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-6 h-6" />
                <span>{fileNames.panCard || "Upload PAN Card"}</span>
              </div>
            </Button>
            {errors.panCard && (
              <p className="text-sm text-red-500 mt-1">{errors.panCard}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="investmentAmount" className="text-gray-300">
          Investment Amount <span className="text-red-500">*</span>
        </Label>
        <Input
          id="investmentAmount"
          name="investmentAmount"
          type="number"
          value={userData.investmentAmount}
          onChange={handleInputChange}
          placeholder="0.00"
          className={`bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500 ${
            errors.investmentAmount ? "border-red-500" : ""
          }`}
        />
        {errors.investmentAmount && (
          <p className="text-sm text-red-500 mt-1">{errors.investmentAmount}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerNote" className="text-gray-300">
          Customer's Note
        </Label>
        <Textarea
          id="customerNote"
          name="customerNote"
          value={userData.customerNote}
          onChange={handleInputChange}
          placeholder="Tell us anything we should know about you..."
          className="h-20 bg-white/5 backdrop-blur-sm border-white/10 text-white placeholder:text-gray-500"
        />
      </div>
    </div>
  );
};

export default DocumentsStep;