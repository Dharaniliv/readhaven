import { NextResponse } from "next/server";
import { searchBooksInDB } from "@/app/lib/db/searchBooks";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const term = searchParams.get("term") || "";
    const results = await searchBooksInDB(term, { limit: 5 });
    return NextResponse.json(results);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("search error:", err);
    }
    
    return NextResponse.json([], { status: 200 });
  }
}
