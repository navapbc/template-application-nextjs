/**
 * @file Next.js route handler
 * @see https://nextjs.org/docs/app/building-your-application/routing/route-handlers
 */
import { NextRequest, NextResponse } from "next/server";

type Data = {
  name: string;
  user_id: string | null;
};

export function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  const user_id = query.get("user_id");

  return NextResponse.json<Data>({ name: "John Doe", user_id });
}
