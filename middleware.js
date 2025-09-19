import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Redirect to login if not signed in
if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
  return NextResponse.redirect(new URL("/login", req.url));
}

  if (!session && req.nextUrl.pathname.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}
