import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(
  request: Request,
  { params }: { params: { id: string[] } }
) {
  try {
    const { id } = await params;
    const imageId = id.join("/");

    const signedUrl = cloudinary.url(imageId, {
      secure: true,
      resource_type: "image",
    });

    const response = await fetch(signedUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Error serving image", { status: 500 });
  }
}
