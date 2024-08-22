/*
import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);

  return NextResponse.redirect(new URL("/about", request.url));
}
*/

import { auth } from "./app/_lib/auth";

// auth also serves as a middleware
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
