"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SecureImageProps {
  publicId: string;
  alt: string;
  type: "aadharFront" | "aadharBack" | "panCard";
}

const SecureImage = ({ publicId, alt, type }: SecureImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImage = async () => {
    if (!publicId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/image/${encodeURIComponent(publicId)}`
      );

      if (!response.ok) {
        throw new Error(`Failed to load image: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      console.error("Error loading image:", error);
      setError(error instanceof Error ? error.message : "Failed to load image");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
    setError(null);
  };

  return (
    <Dialog onOpenChange={(open) => !open && handleDialogClose()}>
      <div className="hidden">
        <DialogTitle>{alt}</DialogTitle>
      </div>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="p-1 text-gray-400 hover:text-white"
          onClick={() => !imageUrl && fetchImage()}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="text-white bg-black/90 border-white/10 max-w-3xl">
        <div className="relative w-full h-[500px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-400">
              {error}
            </div>
          ) : imageUrl ? (
            <Image
              src={imageUrl}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No image available
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecureImage;
