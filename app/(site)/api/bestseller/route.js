import { NextResponse } from "next/server";
import { fetchBooksByCategory } from "@/app/lib/api/googleBooks";
import {
  getBestSellerBooksFromDB,
  storeBestSellerBooksInDB,
} from "@/app/lib/db/bestsellers";

export async function GET() {
  try {
    const dbBooks = await getBestSellerBooksFromDB();

    if (dbBooks.length > 0) {
      const books = dbBooks.map((book) => ({
        googleId: book.googleId,
        title: book.title,
        author: book.author,
        price: book.price,
        originalPrice: book.originalPrice,
        image: book.image,
      }));
      return NextResponse.json(books);
    }

    const booksData = await fetchBooksByCategory("fantasy", 80);
    const processedBooks = booksData
      .filter((item) => item.volumeInfo.imageLinks?.thumbnail)
      .map((item) => {
        const basePrice = Math.floor(Math.random() * 201) + 100;
        const originalPrice = basePrice + Math.floor(Math.random() * 301) + 200;

        return {
          googleId: item.id,
          title: item.volumeInfo.title || "Untitled",
          author: item.volumeInfo.authors?.[0] || "Unknown",
          description:
            item.volumeInfo.description || "No description available.",
          price: `Rs.${basePrice}`,
          originalPrice: `Rs.${originalPrice}`,
          image: item.volumeInfo.imageLinks.thumbnail,
          category: "bestseller",
        };
      });

    await storeBestSellerBooksInDB(processedBooks);

    const trimmed = processedBooks.map((book) => ({
      googleId: book.googleId,
      title: book.title,
      author: book.author,
      price: book.price,
      originalPrice: book.originalPrice,
      image: book.image,
    }));

    return NextResponse.json(trimmed);
  } catch (err) {
  if (process.env.NODE_ENV === "development") {
  console.error("API Error route:", err);
}
    return NextResponse.json([], { status: 500 });
  }
}
