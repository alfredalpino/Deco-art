import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /product to /products
  if (pathname === "/product") {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  // Redirect /product/* to /products/*
  if (pathname.startsWith("/product/") && pathname !== "/product") {
    const newPath = pathname.replace("/product/", "/products/");
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/:path*"],
};
