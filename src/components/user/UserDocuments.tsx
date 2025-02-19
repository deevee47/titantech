"use client";

import React from "react";
import SecureImage from "../SecureImage";

interface UserDocumentsProps {
  aadharFrontUrl?: string;
  aadharBackUrl?: string;
  panCardUrl?: string;
}

export default function UserDocuments({ 
  aadharFrontUrl, 
  aadharBackUrl, 
  panCardUrl 
}: UserDocumentsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">
            Aadhar Front:
          </span>
          {aadharFrontUrl && (
            <SecureImage
              publicId={aadharFrontUrl}
              alt="Aadhar Front"
              type="aadharFront"
            />
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">
            Aadhar Back:
          </span>
          {aadharBackUrl && (
            <SecureImage
              publicId={aadharBackUrl}
              alt="Aadhar Back"
              type="aadharBack"
            />
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">
            PAN Card:
          </span>
          {panCardUrl && (
            <SecureImage
              publicId={panCardUrl}
              alt="PAN Card"
              type="panCard"
            />
          )}
        </div>
      </div>
    </div>
  );
}