import { NextResponse } from "next/server";
import { getAllBooksFromDB } from "@/app/lib/db/allbooks";

export async function GET() {
  try {
    const books = await getAllBooksFromDB();

    const trimmed = books.map((book) => ({
      googleId: book.googleId,
      title: book.title,
      author: book.author,
      price: book.price,
      originalPrice: book.originalPrice,
      image: book.image,
      category: book.category,
    }));

    return NextResponse.json(trimmed);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("All Books API Error:", err);}
    return NextResponse.json([], { status: 500 });
  }
}
