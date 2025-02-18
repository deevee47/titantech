import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Protect the image API routes
  if (request.nextUrl.pathname.startsWith("/api/image")) {
    const session = await getToken({ req: request });

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/image/:path*",
};
